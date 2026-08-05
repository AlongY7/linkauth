/**
 * SM3 Cryptographic Hash Algorithm
 * Pure JavaScript implementation for browser use
 * Conforms to GM/T 0004-2012 standard
 */

(function () {
  'use strict';

  // Initial Value (IV)
  var IV = [
    0x7380166f, 0x4914b2b9, 0x172442d7, 0xda8a0600,
    0xa96f30bc, 0x163138aa, 0xe38dee4d, 0xb0fb0e4e
  ];

  // Constants T_j
  function T(j) {
    if (j >= 0 && j <= 15) {
      return 0x79cc4519;
    } else if (j >= 16 && j <= 63) {
      return 0x7a879d8a;
    }
    return 0;
  }

  // Left rotate (cyclic shift) for 32-bit integer
  function rotl(x, n) {
    n = n >>> 0;
    x = x >>> 0;
    return ((x << n) | (x >>> (32 - n))) >>> 0;
  }

  // Boolean functions FF_j
  function FF(j, x, y, z) {
    x = x >>> 0; y = y >>> 0; z = z >>> 0;
    if (j >= 0 && j <= 15) {
      return (x ^ y ^ z) >>> 0;
    } else if (j >= 16 && j <= 63) {
      return ((x & y) | (x & z) | (y & z)) >>> 0;
    }
    return 0;
  }

  // Boolean functions GG_j
  function GG(j, x, y, z) {
    x = x >>> 0; y = y >>> 0; z = z >>> 0;
    if (j >= 0 && j <= 15) {
      return (x ^ y ^ z) >>> 0;
    } else if (j >= 16 && j <= 63) {
      return ((x & z) | (y & (~z))) >>> 0;
    }
    return 0;
  }

  // Permutation function P0
  function P0(x) {
    x = x >>> 0;
    return (x ^ rotl(x, 9) ^ rotl(x, 17)) >>> 0;
  }

  // Permutation function P1
  function P1(x) {
    x = x >>> 0;
    return (x ^ rotl(x, 15) ^ rotl(x, 23)) >>> 0;
  }

  // Convert a string to a byte array (UTF-8 encoding)
  function stringToBytes(str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if (code < 0x80) {
        bytes.push(code);
      } else if (code < 0x800) {
        bytes.push(0xc0 | (code >>> 6));
        bytes.push(0x80 | (code & 0x3f));
      } else if (code < 0xd800 || code >= 0xe000) {
        bytes.push(0xe0 | (code >>> 12));
        bytes.push(0x80 | ((code >>> 6) & 0x3f));
        bytes.push(0x80 | (code & 0x3f));
      } else {
        // Surrogate pair
        i++;
        var code2 = str.charCodeAt(i);
        var cp = 0x10000 + ((code - 0xd800) << 10) + (code2 - 0xdc00);
        bytes.push(0xf0 | (cp >>> 18));
        bytes.push(0x80 | ((cp >>> 12) & 0x3f));
        bytes.push(0x80 | ((cp >>> 6) & 0x3f));
        bytes.push(0x80 | (cp & 0x3f));
      }
    }
    return bytes;
  }

  // Convert byte array to word array (4 bytes per word)
  function bytesToWords(bytes) {
    var words = [];
    for (var i = 0; i < bytes.length; i += 4) {
      var w = ((bytes[i] || 0) << 24) |
              ((bytes[i + 1] || 0) << 16) |
              ((bytes[i + 2] || 0) << 8) |
              ((bytes[i + 3] || 0));
      words.push(w >>> 0);
    }
    // If not a multiple of 4, we need to handle it
    return words;
  }

  // Pad message according to SM3 spec
  function padMessage(bytes) {
    var len = bytes.length;
    var bitsLen = len * 8;

    // Append 0x80
    bytes.push(0x80);

    // Append zeros until length ≡ 56 mod 64
    while ((bytes.length + 8) % 64 !== 0) {
      bytes.push(0x00);
    }

    // Append 64-bit length (big-endian)
    // JavaScript bitwise works on 32-bit, so we handle high/low separately
    var high = Math.floor(bitsLen / 0x100000000) >>> 0;
    var low = bitsLen >>> 0;

    for (var i = 3; i >= 0; i--) {
      bytes.push((high >>> (i * 8)) & 0xff);
    }
    for (var i = 3; i >= 0; i--) {
      bytes.push((low >>> (i * 8)) & 0xff);
    }

    return bytes;
  }

  // Process a single 64-byte (512-bit) block
  function processBlock(words, offset, V) {
    var W = [];
    var Wp = [];

    // Copy V into working registers
    var A = V[0] >>> 0, B = V[1] >>> 0, C = V[2] >>> 0, D = V[3] >>> 0;
    var E = V[4] >>> 0, F = V[5] >>> 0, G = V[6] >>> 0, H = V[7] >>> 0;

    // Message expansion: W[0..15]
    for (var j = 0; j < 16; j++) {
      W[j] = words[offset + j] >>> 0;
    }

    // Message expansion: W[16..67]
    for (var j = 16; j < 68; j++) {
      W[j] = (P1(W[j - 16] ^ W[j - 9] ^ rotl(W[j - 3], 15)) ^
              rotl(W[j - 13], 7) ^
              W[j - 6]) >>> 0;
    }

    // Message expansion: W'[0..63]
    for (var j = 0; j < 64; j++) {
      Wp[j] = (W[j] ^ W[j + 4]) >>> 0;
    }

    // Compression function - 64 rounds
    for (var j = 0; j < 64; j++) {
      var SS1 = rotl((rotl(A, 12) + E + rotl(T(j), j)) >>> 0, 7);
      var SS2 = (SS1 ^ rotl(A, 12)) >>> 0;
      var TT1 = (FF(j, A, B, C) + D + SS2 + Wp[j]) >>> 0;
      var TT2 = (GG(j, E, F, G) + H + SS1 + W[j]) >>> 0;

      D = C;
      C = rotl(B, 9);
      B = A;
      A = TT1;
      H = G;
      G = rotl(F, 19);
      F = E;
      E = P0(TT2);
    }

    // Update V
    V[0] = (A ^ V[0]) >>> 0;
    V[1] = (B ^ V[1]) >>> 0;
    V[2] = (C ^ V[2]) >>> 0;
    V[3] = (D ^ V[3]) >>> 0;
    V[4] = (E ^ V[4]) >>> 0;
    V[5] = (F ^ V[5]) >>> 0;
    V[6] = (G ^ V[6]) >>> 0;
    V[7] = (H ^ V[7]) >>> 0;
  }

  // Convert hash value (8 words) to hex string
  function wordsToHex(words) {
    var hex = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i] >>> 0;
      hex += ('00000000' + w.toString(16)).slice(-8);
    }
    return hex;
  }

  /**
   * Compute SM3 hash of a string
   * @param {string} str - Input string
   * @returns {string} - Hex string of hash (64 characters)
   */
  function sm3Hash(str) {
    if (typeof str !== 'string') {
      str = String(str);
    }

    // Step 1: Convert to bytes (UTF-8)
    var bytes = stringToBytes(str);

    // Step 2: Pad message
    bytes = padMessage(bytes);

    // Step 3: Initialize V with IV
    var V = IV.slice();

    // Step 4: Process each 64-byte block
    var words = bytesToWords(bytes);
    var blockCount = words.length / 16;

    for (var i = 0; i < blockCount; i++) {
      processBlock(words, i * 16, V);
    }

    // Step 5: Output hex string
    return wordsToHex(V);
  }

  // Export to window
  window.SM3 = {
    hash: sm3Hash
  };

})();