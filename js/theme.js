/* ============================================================
   Arctic Compass LinkAuth - Theme Manager
   Light/Dark theme with localStorage persistence
   ============================================================ */

(function () {
  'use strict';

  var THEME_KEY = 'linkauth-theme';
  var THEME_ATTR = 'data-theme';
  var THEME_CLASS_LIGHT = 'theme-light';
  var THEME_CLASS_DARK = 'theme-dark';

  var THEMES = {
    light: 'light',
    dark: 'dark',
    auto: 'auto'
  };

  var currentTheme = THEMES.auto;

  // ============================================================
  // Theme Application
  // ============================================================
  function applyTheme(theme) {
    var html = document.documentElement;
    var body = document.body;

    // Remove existing theme classes
    html.classList.remove(THEME_CLASS_LIGHT, THEME_CLASS_DARK);
    body.classList.remove(THEME_CLASS_LIGHT, THEME_CLASS_DARK);

    if (theme === THEMES.dark) {
      html.classList.add(THEME_CLASS_DARK);
      body.classList.add(THEME_CLASS_DARK);
      html.setAttribute(THEME_ATTR, 'dark');
    } else if (theme === THEMES.light) {
      html.classList.add(THEME_CLASS_LIGHT);
      body.classList.add(THEME_CLASS_LIGHT);
      html.setAttribute(THEME_ATTR, 'light');
    } else {
      // Auto mode - respect system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add(THEME_CLASS_DARK);
        body.classList.add(THEME_CLASS_DARK);
        html.setAttribute(THEME_ATTR, 'dark');
      } else {
        html.classList.add(THEME_CLASS_LIGHT);
        body.classList.add(THEME_CLASS_LIGHT);
        html.setAttribute(THEME_ATTR, 'light');
      }
    }
  }

  function getEffectiveTheme() {
    return document.documentElement.getAttribute(THEME_ATTR) || 'light';
  }

  // ============================================================
  // Storage
  // ============================================================
  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore
    }
  }

  // ============================================================
  // Theme Toggle
  // ============================================================
  function setTheme(theme) {
    if (!THEMES[theme]) {
      console.warn('[Theme] Unknown theme:', theme);
      return;
    }
    currentTheme = theme;
    setStoredTheme(theme);
    applyTheme(theme);

    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('theme:changed', {
      detail: { theme: theme, effective: getEffectiveTheme() }
    }));
  }

  function toggleTheme() {
    var effective = getEffectiveTheme();
    var next = effective === 'dark' ? 'light' : 'dark';
    setTheme(next);
    return next;
  }

  function cycleTheme() {
    // Cycle through: light -> dark -> auto
    if (currentTheme === 'light') {
      setTheme('dark');
    } else if (currentTheme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
    return currentTheme;
  }

  // ============================================================
  // Theme Toggle Button
  // ============================================================
  function createThemeToggleButton() {
    var button = document.createElement('button');
    button.className = 'theme-toggle-btn';
    button.setAttribute('aria-label', 'Toggle theme');
    button.setAttribute('title', 'Toggle theme');
    button.innerHTML = '<span class="theme-toggle-icon"></span>';
    button.addEventListener('click', function () {
      toggleTheme();
      updateThemeToggleIcon(button);
    });

    // Set initial icon
    updateThemeToggleIcon(button);

    return button;
  }

  function updateThemeToggleIcon(button) {
    if (!button) {
      button = document.querySelector('.theme-toggle-btn');
    }
    if (!button) return;

    var effective = getEffectiveTheme();
    var icon = button.querySelector('.theme-toggle-icon');
    if (!icon) {
      icon = document.createElement('span');
      icon.className = 'theme-toggle-icon';
      button.appendChild(icon);
    }

    if (effective === 'dark') {
      // Show sun icon for switching to light
      icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    } else {
      // Show moon icon for switching to dark
      icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }

    button.setAttribute('data-theme-state', effective);
  }

  // ============================================================
  // Language Switcher Button
  // ============================================================
  function createLangSwitcherButton() {
    var button = document.createElement('button');
    button.className = 'lang-switcher-btn';
    button.setAttribute('aria-label', 'Toggle language');
    button.setAttribute('title', 'Toggle language');

    var lang = window.I18n ? window.I18n.getCurrentLang() : 'zh';
    button.textContent = lang === 'zh' ? 'EN' : '中';

    button.addEventListener('click', function () {
      if (window.I18n) {
        var newLang = window.I18n.toggleLang();
        button.textContent = newLang === 'zh' ? 'EN' : '中';
      }
    });

    return button;
  }

  // ============================================================
  // Initialize
  // ============================================================
  function init() {
    var stored = getStoredTheme();
    currentTheme = stored && THEMES[stored] ? stored : THEMES.auto;
    applyTheme(currentTheme);

    // Listen for system theme changes (only when in auto mode)
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (currentTheme === THEMES.auto) {
          applyTheme(THEMES.auto);
          updateThemeToggleIcon();
        }
      });
    }

    // Listen for i18n changes to update lang button
    document.addEventListener('i18n:changed', function () {
      var langBtn = document.querySelector('.lang-switcher-btn');
      if (langBtn && window.I18n) {
        var lang = window.I18n.getCurrentLang();
        langBtn.textContent = lang === 'zh' ? 'EN' : '中';
      }
    });

    // Auto-inject theme toggle and lang switcher into header
    // Look for containers with [data-header-controls] attribute
    var controlsContainers = document.querySelectorAll('[data-header-controls]');
    controlsContainers.forEach(function (container) {
      var themeBtn = createThemeToggleButton();
      var langBtn = createLangSwitcherButton();
      container.appendChild(themeBtn);
      container.appendChild(langBtn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================================
  // Public API
  // ============================================================
  window.ThemeManager = {
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    cycleTheme: cycleTheme,
    getEffectiveTheme: getEffectiveTheme,
    getCurrentTheme: function () { return currentTheme; },
    createThemeToggleButton: createThemeToggleButton,
    createLangSwitcherButton: createLangSwitcherButton,
    updateThemeToggleIcon: updateThemeToggleIcon,
    THEMES: THEMES
  };
})();