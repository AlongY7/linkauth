/**
 * LinkAuth Core v3.0 — 纯前端认证系统 (localStorage 版)
 * =====================================================
 * 无需后端服务器，所有数据存储在浏览器 localStorage 中。
 * 支持：注册、登录、OAuth2.0 授权、用户中心、后台管理、密码找回、
 *       管理密钥恢复、临时登录、应用管理。
 *
 * 数据存储键：
 *   _linkauth_users          — 用户数组
 *   _linkauth_session        — 当前登录会话
 *   _linkauth_apps           — OAuth 应用列表
 *   _linkauth_codes          — 授权码列表
 *   _linkauth_approvals      — 用户授权记录
 *   _linkauth_admin_key      — 管理员密钥
 *   _linkauth_notifications  — 通知列表
 */

(function () {
  'use strict';

  // ==================== 存储键 ====================
  var K = {
    USERS: '_linkauth_users',
    SESSION: '_linkauth_session',
    APPS: '_linkauth_apps',
    CODES: '_linkauth_codes',
    APPROVALS: '_linkauth_approvals',
    ADMIN_KEY: '_linkauth_admin_key',
    NOTIFICATIONS: '_linkauth_notifications',
  };

  // ==================== 工具函数 ====================
  function uid(prefix) {
    var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var s = prefix || '';
    for (var i = 0; i < 24; i++) s += c.charAt(Math.floor(Math.random() * c.length));
    return s;
  }

  function ts() { return Math.floor(Date.now() / 1000); }

  function get(k) {
    try { var d = localStorage.getItem(k); return d ? JSON.parse(d) : null; }
    catch (e) { return null; }
  }

  function set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { return false; }
  }

  function sm3(s) {
    return (window.SM3 && window.SM3.hash) ? window.SM3.hash(s) : s;
  }

  // ==================== 初始化默认数据 ====================
  function initDefaults() {
    var users = get(K.USERS) || [];
    if (users.length === 0) {
      users = [{
        link_id: 'Admin001@ArcticCompass_id',
        username: 'Admin001',
        account_type: '@ArcticCompass_id',
        password_hash: sm3('admin123456'),
        email: 'admin@arcticcompass.dev',
        security_questions: [{ q: '你的出生城市是？', a: sm3('北京') }],
        manager_key: uid('mk_'),
        role: 'admin',
        status: 'active',
        is_temp: false,
        temp_expires: 0,
        temp_extend_count: 0,
        created_at: ts(),
        notifications: [],
      }];
      set(K.USERS, users);
    }

    if (!get(K.APPS)) {
      set(K.APPS, [{
        client_id: 'zouxiang_app_v1',
        app_name: '走象推理模型',
        app_type: 'web',
        app_desc: 'AI 推理/占卜类应用',
        redirect_uris: [
          'https://alongy7.github.io/zouxiang/',
          'http://localhost:3002/callback',
        ],
        business_type: 'ai',
        status: 'active',
        created_at: ts(),
      }]);
    }

    if (!get(K.ADMIN_KEY)) set(K.ADMIN_KEY, 'admin_master_key_2024');
    if (!get(K.APPROVALS)) set(K.APPROVALS, []);
    if (!get(K.CODES)) set(K.CODES, []);
    if (!get(K.NOTIFICATIONS)) set(K.NOTIFICATIONS, []);
  }

  // ==================== 公开 API ====================
  window.LinkAuthCore = {

    init: function () { initDefaults(); },

    // ---- 注册 ----
    register: function (data) {
      var users = get(K.USERS) || [];
      if (users.some(function (u) { return u.link_id === data.link_id; })) {
        return { ok: false, error: '该账号已存在' };
      }

      var qs = (data.security_questions || []).map(function (q) {
        return { q: q.question, a: sm3(q.answer) };
      });

      var user = {
        link_id: data.link_id,
        username: data.link_id.split('@')[0],
        account_type: '@' + data.link_id.split('@')[1],
        password_hash: sm3(data.password),
        email: data.email || '',
        security_questions: qs,
        manager_key: uid('mk_'),
        role: 'user',
        status: 'active',
        is_temp: false,
        temp_expires: 0,
        temp_extend_count: 0,
        created_at: ts(),
        notifications: [],
      };
      users.push(user);
      set(K.USERS, users);

      return { ok: true, link_id: user.link_id, manager_key: user.manager_key, message: '注册成功！请妥善保管你的管理密钥' };
    },

    // ---- 登录 ----
    login: function (account, password) {
      var users = get(K.USERS) || [];
      var hash = sm3(password);
      var user = users.find(function (u) { return u.link_id === account && u.password_hash === hash; });

      if (!user) return { ok: false, error: '账号或密码错误' };
      if (user.status === 'banned') return { ok: false, error: '该账号已被封禁' };
      if (user.is_temp && user.temp_expires > 0 && user.temp_expires < ts()) return { ok: false, error: '临时账号已过期' };

      var session = { link_id: user.link_id, username: user.username, role: user.role, token: uid('t_'), created_at: ts() };
      set(K.SESSION, session);

      return { ok: true, link_id: user.link_id, username: user.username, role: user.role, token: session.token };
    },

    // ---- OAuth 授权码 ----
    createAuthCode: function (clientId, linkId) {
      var codes = get(K.CODES) || [];
      // 清理过期
      codes = codes.filter(function (c) { return c.expires_at > ts() && !c.used; });
      var code = uid('ac_');
      codes.push({ code: code, client_id: clientId, link_id: linkId, created_at: ts(), expires_at: ts() + 600, used: false });
      set(K.CODES, codes);
      return code;
    },

    validateAuthCode: function (code) {
      var codes = get(K.CODES) || [];
      var entry = codes.find(function (c) { return c.code === code && !c.used && c.expires_at > ts(); });
      if (!entry) return { ok: false, error: '授权码无效或已过期' };

      entry.used = true;
      set(K.CODES, codes);

      var users = get(K.USERS) || [];
      var user = users.find(function (u) { return u.link_id === entry.link_id; });
      return { ok: true, link_id: entry.link_id, username: user ? user.username : '', client_id: entry.client_id };
    },

    // ---- 应用授权 ----
    isAppAuthorized: function (linkId, clientId) {
      var a = get(K.APPROVALS) || [];
      return a.some(function (x) { return x.link_id === linkId && x.client_id === clientId; });
    },

    approveApp: function (linkId, clientId) {
      var a = get(K.APPROVALS) || [];
      if (!a.some(function (x) { return x.link_id === linkId && x.client_id === clientId; })) {
        a.push({ link_id: linkId, client_id: clientId, approved_at: ts() });
        set(K.APPROVALS, a);
      }
    },

    revokeApp: function (linkId, clientId) {
      var a = get(K.APPROVALS) || [];
      a = a.filter(function (x) { return !(x.link_id === linkId && x.client_id === clientId); });
      set(K.APPROVALS, a);
    },

    getAppInfo: function (clientId) {
      var apps = get(K.APPS) || [];
      return apps.find(function (a) { return a.client_id === clientId; }) || null;
    },

    getAuthorizedApps: function (linkId) {
      var approvals = get(K.APPROVALS) || [];
      var apps = get(K.APPS) || [];
      return approvals.filter(function (a) { return a.link_id === linkId; }).map(function (a) {
        var app = apps.find(function (ap) { return ap.client_id === a.client_id; });
        return { client_id: a.client_id, app_name: app ? app.app_name : '未知应用', approved_at: a.approved_at };
      });
    },

    // ---- 会话 ----
    getSession: function () { return get(K.SESSION); },
    clearSession: function () { localStorage.removeItem(K.SESSION); },

    // ---- 用户信息 ----
    getUserProfile: function (linkId) {
      var users = get(K.USERS) || [];
      var u = users.find(function (x) { return x.link_id === linkId; });
      if (!u) return null;
      return {
        link_id: u.link_id, username: u.username, account_type: u.account_type,
        email: u.email, role: u.role, status: u.status,
        is_temp: u.is_temp, temp_expires: u.temp_expires, temp_extend_count: u.temp_extend_count,
        created_at: u.created_at, manager_key: u.manager_key,
      };
    },

    changePassword: function (linkId, oldPwd, newPwd) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      if (idx === -1) return { ok: false, error: '用户不存在' };
      if (users[idx].password_hash !== sm3(oldPwd)) return { ok: false, error: '原密码错误' };
      users[idx].password_hash = sm3(newPwd);
      set(K.USERS, users);
      return { ok: true, message: '密码修改成功' };
    },

    updateSecurityQuestions: function (linkId, questions) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      if (idx === -1) return { ok: false, error: '用户不存在' };
      users[idx].security_questions = questions.map(function (q) {
        return { q: q.question, a: sm3(q.answer) };
      });
      set(K.USERS, users);
      return { ok: true, message: '安全问题更新成功' };
    },

    getSecurityQuestions: function (linkId) {
      var users = get(K.USERS) || [];
      var u = users.find(function (x) { return x.link_id === linkId; });
      return u ? u.security_questions.map(function (q) { return { question: q.q }; }) : null;
    },

    verifySecurityQuestions: function (linkId, answers) {
      var users = get(K.USERS) || [];
      var u = users.find(function (x) { return x.link_id === linkId; });
      if (!u) return { ok: false, error: '用户不存在' };
      for (var i = 0; i < u.security_questions.length; i++) {
        if (u.security_questions[i].a !== sm3(answers[i] || '')) {
          return { ok: false, error: '第 ' + (i + 1) + ' 个安全问题答案错误' };
        }
      }
      return { ok: true };
    },

    resetPassword: function (linkId, answers, newPwd) {
      var v = this.verifySecurityQuestions(linkId, answers);
      if (!v.ok) return v;
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      users[idx].password_hash = sm3(newPwd);
      set(K.USERS, users);
      return { ok: true, message: '密码重置成功' };
    },

    // ---- 管理密钥找回 ----
    recoverManagerKey: function (username, linkId, password, answers) {
      var users = get(K.USERS) || [];
      var u = users.find(function (x) { return x.link_id === linkId && x.username === username; });
      if (!u) return { ok: false, error: '用户不存在或信息不匹配' };
      if (u.password_hash !== sm3(password)) return { ok: false, error: '密码错误' };
      var v = this.verifySecurityQuestions(linkId, answers);
      if (!v.ok) return v;
      var newKey = uid('mk_');
      u.manager_key = newKey;
      set(K.USERS, users);
      return { ok: true, manager_key: newKey, message: '管理密钥已找回并更新' };
    },

    // ---- 临时登录 ----
    createTempAccount: function () {
      var users = get(K.USERS) || [];
      var rid = 'TMP' + Math.random().toString(36).substring(2, 8).toUpperCase();
      var pwd = rid + '_tmp';
      var u = {
        link_id: rid + '@ArcticCompass_id', username: rid, account_type: '@ArcticCompass_id',
        password_hash: sm3(pwd), email: '', security_questions: [],
        manager_key: '', role: 'temp', status: 'active',
        is_temp: true, temp_expires: ts() + 86400, temp_extend_count: 0,
        created_at: ts(), notifications: [],
      };
      users.push(u);
      set(K.USERS, users);
      return { ok: true, link_id: u.link_id, password: pwd, message: '临时账号创建成功，有效期24小时，过期后自动销毁' };
    },

    extendTempAccount: function (linkId) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId && u.is_temp; });
      if (idx === -1) return { ok: false, error: '临时账号不存在' };
      if (users[idx].temp_extend_count >= 3) return { ok: false, error: '已达到最大延期次数（3次）' };
      users[idx].temp_expires += 86400;
      users[idx].temp_extend_count += 1;
      set(K.USERS, users);
      return { ok: true, message: '已延期，剩余次数：' + (3 - users[idx].temp_extend_count) };
    },

    getTempStatus: function (linkId) {
      var users = get(K.USERS) || [];
      var u = users.find(function (x) { return x.link_id === linkId && x.is_temp; });
      if (!u) return null;
      return { expires_at: u.temp_expires, extend_count: u.temp_extend_count, max_extends: 3 };
    },

    // ---- 管理员 ----
    adminLogin: function (key) {
      if (key === get(K.ADMIN_KEY)) {
        var s = { link_id: 'admin', username: '系统管理员', role: 'admin', token: uid('t_'), created_at: ts() };
        set(K.SESSION, s);
        return { ok: true, token: s.token };
      }
      return { ok: false, error: '管理员密钥错误' };
    },

    getAllUsers: function () {
      return (get(K.USERS) || []).map(function (u) {
        return { link_id: u.link_id, username: u.username, role: u.role, status: u.status, is_temp: u.is_temp, created_at: u.created_at, temp_expires: u.temp_expires };
      });
    },

    toggleUserBan: function (linkId) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      if (idx === -1) return { ok: false, error: '用户不存在' };
      if (users[idx].role === 'admin') return { ok: false, error: '不能操作管理员账号' };
      users[idx].status = users[idx].status === 'banned' ? 'active' : 'banned';
      set(K.USERS, users);
      return { ok: true, message: '已' + (users[idx].status === 'banned' ? '封禁' : '解封'), new_status: users[idx].status };
    },

    deleteUser: function (linkId) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      if (idx === -1) return { ok: false, error: '用户不存在' };
      if (users[idx].role === 'admin') return { ok: false, error: '不能删除管理员账号' };
      users.splice(idx, 1);
      set(K.USERS, users);
      return { ok: true, message: '用户已删除' };
    },

    getAllApps: function () { return get(K.APPS) || []; },

    registerApp: function (appData) {
      var apps = get(K.APPS) || [];
      var a = {
        client_id: appData.client_id || uid('app_'),
        app_name: appData.app_name, app_type: appData.app_type || 'web',
        app_desc: appData.app_desc || '',
        redirect_uris: appData.redirect_uris || [],
        business_type: appData.business_type || 'general',
        status: 'active', created_at: ts(),
      };
      apps.push(a);
      set(K.APPS, apps);
      return { ok: true, app: a };
    },

    deleteApp: function (clientId) {
      var apps = get(K.APPS) || [];
      apps = apps.filter(function (a) { return a.client_id !== clientId; });
      set(K.APPS, apps);
      return { ok: true, message: '应用已删除' };
    },

    // ---- 通知 ----
    getNotifications: function (linkId) {
      var users = get(K.USERS) || [];
      var u = users.find(function (x) { return x.link_id === linkId; });
      return u ? (u.notifications || []) : [];
    },

    addNotification: function (linkId, title, body, type) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      if (idx === -1) return false;
      if (!users[idx].notifications) users[idx].notifications = [];
      users[idx].notifications.unshift({
        id: uid('n_'), title: title, body: body, type: type || 'info',
        read: false, created_at: ts(),
      });
      set(K.USERS, users);
      return true;
    },

    markNotificationRead: function (linkId, nid) {
      var users = get(K.USERS) || [];
      var idx = users.findIndex(function (u) { return u.link_id === linkId; });
      if (idx === -1) return false;
      var n = (users[idx].notifications || []).find(function (x) { return x.id === nid; });
      if (n) { n.read = true; set(K.USERS, users); return true; }
      return false;
    },
  };

  // 自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initDefaults(); });
  } else {
    initDefaults();
  }
})();