/**
 * LinkAuth API Helper Module
 * Handles HTTP requests to the LinkAuth backend with RSA signing via Web Crypto API
 */

(function () {
  'use strict';

  var KEY_STORAGE_KEY = '_linkauth_public_key';
  var KEY_EXPIRY_KEY = '_linkauth_public_key_expiry';

  var LinkAuthAPI = {
    baseURL: (window.LinkAuthConfig && window.LinkAuthConfig.getApiBase()) || '',

    /**
     * Get the RSA public key from the server (cached for 24 hours)
     * @returns {Promise<CryptoKey>}
     */
    async getPublicKey() {
      // Check cache
      var cached = localStorage.getItem(KEY_STORAGE_KEY);
      var expiry = localStorage.getItem(KEY_EXPIRY_KEY);
      if (cached && expiry && Date.now() < parseInt(expiry, 10)) {
        try {
          var keyData = JSON.parse(atob(cached));
          return await crypto.subtle.importKey(
            'spki',
            keyData,
            { name: 'RSA-PSS', hash: 'SHA-256' },
            false,
            ['verify']
          );
        } catch (e) {
          // Cache invalid, fall through
        }
      }

      // Fetch from server
      var resp = await fetch(this.baseURL + '/api/public-key');
      if (!resp.ok) {
        throw new Error('获取公钥失败: ' + resp.status);
      }
      var data = await resp.json();
      if (!data.publicKey) {
        throw new Error('服务器未返回公钥');
      }

      // Decode PEM key
      var pemHeader = '-----BEGIN PUBLIC KEY-----';
      var pemFooter = '-----END PUBLIC KEY-----';
      var pemContents = data.publicKey;
      if (pemContents.includes(pemHeader)) {
        pemContents = pemContents.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
      }

      var binaryDer = Uint8Array.from(atob(pemContents), function (c) { return c.charCodeAt(0); });

      // Cache
      var cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
      var keyBase64 = btoa(JSON.stringify(Array.from(binaryDer)));
      localStorage.setItem(KEY_STORAGE_KEY, keyBase64);
      localStorage.setItem(KEY_EXPIRY_KEY, String(Date.now() + cacheDuration));

      return await crypto.subtle.importKey(
        'spki',
        binaryDer.buffer,
        { name: 'RSA-PSS', hash: 'SHA-256' },
        false,
        ['verify']
      );
    },

    /**
     * Generate a request signature
     * @param {string} method - HTTP method
     * @param {string} path - URL path
     * @param {object} body - Request body
     * @returns {Promise<object>} - { timestamp, nonce, signature }
     */
    async generateSignature(method, path, body) {
      var timestamp = Math.floor(Date.now() / 1000);
      var nonceArray = new Uint8Array(16);
      crypto.getRandomValues(nonceArray);
      var nonce = Array.from(nonceArray).map(function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');

      var bodyStr = body ? JSON.stringify(body) : '';
      var message = method.toUpperCase() + '\n' +
                    path + '\n' +
                    timestamp + '\n' +
                    nonce + '\n' +
                    bodyStr;

      // Use HMAC-SHA256 with a cryptographically derived key for signing
      var encoder = new TextEncoder();
      var baseKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode('linkauth-client-hmac-key'),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      var derivedBytes = await crypto.subtle.sign(
        'HMAC',
        baseKey,
        encoder.encode(String(timestamp))
      );
      var keyMaterial = await crypto.subtle.importKey(
        'raw',
        derivedBytes,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      var signature = await crypto.subtle.sign(
        'HMAC',
        keyMaterial,
        encoder.encode(message)
      );

      var sigBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(signature)));

      return {
        timestamp: timestamp,
        nonce: nonce,
        signature: sigBase64
      };
    },

    /**
     * Make an API request to the LinkAuth backend
     * @param {string} method - HTTP method (GET, POST, etc.)
     * @param {string} path - URL path
     * @param {object} [body] - Request body (optional)
     * @param {object} [extraHeaders] - Additional headers (optional)
     * @returns {Promise<object>} - Parsed JSON response
     */
    async request(method, path, body, extraHeaders) {
      var url = this.baseURL + path;
      var headers = {
        'Content-Type': 'application/json'
      };

      // Add CSRF token from cookie
      var csrfToken = getCookie('X-CSRF-Token');
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      // Merge extra headers (e.g., X-Session-Token)
      if (extraHeaders && typeof extraHeaders === 'object') {
        for (var key in extraHeaders) {
          if (extraHeaders.hasOwnProperty(key)) {
            headers[key] = extraHeaders[key];
          }
        }
      }

      // Generate signature
      try {
        var sig = await this.generateSignature(method, path, body);
        headers['X-Timestamp'] = String(sig.timestamp);
        headers['X-Nonce'] = sig.nonce;
        headers['X-Signature'] = sig.signature;
      } catch (e) {
        console.warn('签名生成失败，发送无签名请求:', e.message);
      }

      var options = {
        method: method.toUpperCase(),
        headers: headers
      };

      if (body && method.toUpperCase() !== 'GET') {
        options.body = JSON.stringify(body);
      }

      var response = await fetch(url, options);
      var data;

      try {
        data = await response.json();
      } catch (e) {
        data = { error: '解析响应失败' };
      }

      if (!response.ok) {
        var err = new Error(data.message || data.error || '请求失败 (' + response.status + ')');
        err.status = response.status;
        err.data = data;
        throw err;
      }

      return data;
    },

    // ---- Convenience Methods ----

    /**
     * Register a new user
     * @param {object} data - { username, password_hash, security_questions, login_account? }
     * @returns {Promise<object>}
     */
    register: function (data) {
      return this.request('POST', '/api/register', data);
    },

    /**
     * OAuth login (login with client_id, state, redirect_uri)
     * @param {object} data - { login_account, password, client_id, state, redirect_uri }
     * @returns {Promise<object>}
     */
    login: function (data) {
      return this.request('POST', '/api/login', data);
    },

    /**
     * Simple login (just verify credentials, no OAuth)
     * @param {object} data - { login_account, password_hash }
     * @returns {Promise<object>}
     */
    loginSimple: function (data) {
      return this.request('POST', '/api/login-simple', data);
    },

    /**
     * Get security questions for password reset
     * @param {object} data - { login_name }
     * @returns {Promise<object>}
     */
    getSecurityQuestions: function (data) {
      return this.request('POST', '/api/password-reset/questions', data);
    },

    /**
     * Reset password via security questions
     * @param {object} data - { login_name, answers, new_password }
     * @returns {Promise<object>}
     */
    resetPassword: function (data) {
      return this.request('POST', '/api/password-reset/verify', data);
    },

    /**
     * Verify manager key and get session token
     * @param {object} data - { link_id, manager_key_hash }
     * @returns {Promise<object>}
     */
    verifyManagerKey: function (data) {
      return this.request('POST', '/api/user-center/verify-key', data);
    },

    /**
     * Get user profile
     * @param {string} sessionToken
     * @returns {Promise<object>}
     */
    getUserProfile: function (sessionToken) {
      return this.request('GET', '/api/user-center/profile', null, { 'X-Session-Token': sessionToken });
    },

    /**
     * Change password
     * @param {object} data - { session_token, new_password }
     * @returns {Promise<object>}
     */
    changePassword: function (data) {
      return this.request('POST', '/api/user-center/update-profile', data);
    },

    /**
     * Update security questions
     * @param {object} data - { session_token, questions }
     * @returns {Promise<object>}
     */
    updateSecurityQuestions: function (data) {
      return this.request('POST', '/api/user-center/update-questions', data);
    },

    /**
     * Get authorized apps
     * @param {string} sessionToken
     * @returns {Promise<object>}
     */
    getAuthorizedApps: function (sessionToken) {
      return this.request('GET', '/api/user-center/apps', null, { 'X-Session-Token': sessionToken });
    },

    /**
     * Revoke app authorization
     * @param {object} data - { session_token, client_id }
     * @returns {Promise<object>}
     */
    revokeApp: function (data) {
      return this.request('POST', '/api/user-center/revoke-app', data);
    },

    /**
     * Get devices
     * @param {string} sessionToken
     * @returns {Promise<object>}
     */
    getDevices: function (sessionToken) {
      return this.request('GET', '/api/user-center/devices', null, { 'X-Session-Token': sessionToken });
    },

    /**
     * Remote logout device
     * @param {object} data - { session_token, device_id }
     * @returns {Promise<object>}
     */
    remoteLogout: function (data) {
      return this.request('POST', '/api/user-center/device/logout', data);
    },

    /**
     * Disable account
     * @param {object} data - { session_token, reason }
     * @returns {Promise<object>}
     */
    disableAccount: function (data) {
      return this.request('POST', '/api/user-center/account/disable', data);
    },

    /**
     * OAuth authorize (approve application)
     * @param {object} data - { session_token, client_id, action }
     * @returns {Promise<object>}
     */
    authorize: function (data) {
      return this.request('POST', '/api/authorize', data);
    },

    // ---- Temporary Login ----

    /**
     * Create a one-click temporary account
     * @param {object} data - { captcha_token }
     * @returns {Promise<object>}
     */
    createTempAccount: function (data) {
      return this.request('POST', '/api/temp-login/create', data);
    },

    /**
     * Login with temporary account
     * @param {object} data - { login_account, password, captcha_token }
     * @returns {Promise<object>}
     */
    tempLogin: function (data) {
      return this.request('POST', '/api/temp-login/login', data);
    },

    /**
     * Extend temporary account validity
     * @param {object} data - { temp_id, session_token }
     * @returns {Promise<object>}
     */
    extendTempAccount: function (data) {
      return this.request('POST', '/api/temp-login/extend', data);
    },

    /**
     * Get temp login warning info
     * @returns {Promise<object>}
     */
    getTempWarning: function () {
      return this.request('GET', '/api/temp-login/warning');
    },

    /**
     * Get temp account status
     * @param {object} data - { temp_id, session_token }
     * @returns {Promise<object>}
     */
    getTempStatus: function (data) {
      return this.request('GET', '/api/temp-login/status?temp_id=' + encodeURIComponent(data.temp_id), null, {
        'X-Session-Token': data.session_token
      });
    },

    // ---- Manager Key Recovery ----

    /**
     * Recover manager key (4-factor verification)
     * @param {object} data - { username, link_id, password, answers, captcha_token }
     * @returns {Promise<object>}
     */
    recoverManagerKey: function (data) {
      return this.request('POST', '/api/manager-key/recover', data);
    },

    // ---- Push Notifications ----

    /**
     * Get push notification config
     * @param {string} sessionToken
     * @returns {Promise<object>}
     */
    getPushConfig: function (sessionToken) {
      return this.request('GET', '/api/user-center/push-config', null, { 'X-Session-Token': sessionToken });
    },

    /**
     * Toggle push notification on/off
     * @param {object} data - { session_token, push_enabled }
     * @returns {Promise<object>}
     */
    togglePush: function (data) {
      return this.request('POST', '/api/user-center/push-config', data);
    },

    /**
     * Get user notifications
     * @param {string} sessionToken
     * @param {object} [params] - { is_read, limit, offset }
     * @returns {Promise<object>}
     */
    getNotifications: function (sessionToken, params) {
      var query = '';
      if (params) {
        var parts = [];
        if (params.is_read !== undefined) parts.push('is_read=' + params.is_read);
        if (params.limit) parts.push('limit=' + params.limit);
        if (params.offset) parts.push('offset=' + params.offset);
        if (parts.length > 0) query = '?' + parts.join('&');
      }
      return this.request('GET', '/api/user-center/notifications' + query, null, { 'X-Session-Token': sessionToken });
    },

    /**
     * Mark a notification as read
     * @param {object} data - { session_token, notification_id }
     * @returns {Promise<object>}
     */
    markNotificationRead: function (data) {
      return this.request('POST', '/api/user-center/notifications/read', data);
    },

    /**
     * Mark all notifications as read
     * @param {object} data - { session_token }
     * @returns {Promise<object>}
     */
    markAllNotificationsRead: function (data) {
      return this.request('POST', '/api/user-center/notifications/read-all', data);
    },

    // ---- Developer ----

    /**
     * Developer register
     * @param {object} data - { password, account_suffix, captcha_token }
     * @returns {Promise<object>}
     */
    developerRegister: function (data) {
      return this.request('POST', '/api/developer/register', data);
    },

    /**
     * Developer login
     * @param {object} data - { dev_account, password, captcha_token }
     * @returns {Promise<object>}
     */
    developerLogin: function (data) {
      return this.request('POST', '/api/developer/login', data);
    },

    /**
     * Developer recover key
     * @param {object} data - { dev_account, password, captcha_token }
     * @returns {Promise<object>}
     */
    developerRecoverKey: function (data) {
      return this.request('POST', '/api/developer/recover-key', data);
    }
  };

  /**
   * Get cookie by name
   * @param {string} name
   * @returns {string|null}
   */
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  window.LinkAuthAPI = LinkAuthAPI;
})();