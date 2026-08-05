/**
 * LinkAuth 全局配置
 * 可根据部署环境修改 API_BASE
 */
(function () {
  'use strict';

  // 从 localStorage 读取用户自定义的 API 地址（支持动态切换）
  var stored = localStorage.getItem('_linkauth_api_base');

  window.LinkAuthConfig = {
    // API 基础地址：本地开发用 localhost:3000，线上部署需要指向实际后端地址
    API_BASE: stored || 'http://localhost:3000',

    // 设置 API 地址
    setApiBase: function (url) {
      this.API_BASE = url;
      localStorage.setItem('_linkauth_api_base', url);
      if (window.LinkAuthAPI) {
        window.LinkAuthAPI.baseURL = url;
      }
    },

    // 获取当前 API 地址
    getApiBase: function () {
      return this.API_BASE;
    },
  };
})();