/* ============================================================
   Arctic Compass LinkAuth - Hand-drawn SVG Icons
   Original designs with slightly irregular lines for a hand-drawn feel.
   No external icon libraries used.
   ============================================================ */

(function () {
  'use strict';

  /**
   * Icon factory - each icon is an inline SVG string.
   * All icons are original designs with hand-drawn aesthetic:
   * slightly irregular paths, rounded caps, and subtle imperfections.
   * Icons use currentColor for stroke and fill, so they inherit text color.
   */

  var Icons = {
    // ---- Navigation ----
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10 l9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7"/></svg>',

    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',

    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.8"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M4.93 4.93l2.12 2.12"/><path d="M16.95 16.95l2.12 2.12"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.93 19.07l2.12-2.12"/><path d="M16.95 7.05l2.12-2.12"/></svg>',

    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="12" r="5"/><path d="M12 12h8.5"/><path d="M17 9l3 3-3 3"/></svg>',

    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11v-4a4 4 0 0 1 8 0v4"/><circle cx="12" cy="17" r="1.5"/></svg>',

    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 4v6c0 5.25-3.08 7.87-7 10-3.92-2.13-7-4.75-7-10v-6z"/><path d="M9 12l2 2 4-4"/></svg>',

    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18a2 2 0 0 1-4 0"/><path d="M5 10a7 7 0 0 1 14 0v4l2 3H3l2-3z"/></svg>',

    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',

    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',

    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></svg>',

    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',

    language: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></svg>',

    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>',

    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',

    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',

    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>',

    'external-link': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7h-4"/><path d="M17 7v4"/><path d="M10 14l7-7"/><path d="M7 5h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',

    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M14 21v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75 5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48a5.07 5.07 0 0 0-.09 3.77 5.44 5.44 0 0 0-1.5 3.75c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v3.91"/></svg>',

    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3"/><path d="M13 15h4"/></svg>',

    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><circle cx="7" cy="6.5" r="1"/><circle cx="7" cy="17.5" r="1"/></svg>',

    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3.5"/><path d="M4 6v5c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5v-5"/><path d="M4 11v5c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5v-5"/></svg>',

    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 22v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L21 8"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L3 16"/></svg>',

    // ---- Extended Icons ----
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5l4.5 4.5"/></svg>',

    'chevron-down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',

    'chevron-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>',

    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',

    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',

    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M8 6v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-14"/></svg>',

    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',

    'eye-off': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94a10 10 0 0 1-15.16-5.46"/><path d="M6.06 6.06a10 10 0 0 1 15.16 5.56"/><path d="M2 2l20 20"/></svg>',

    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20l-10-18z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16.5" r="0.5" fill="currentColor"/></svg>',

    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',

    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M8 12l2.5 2.5 5-5"/></svg>',

    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><line x1="8" y1="8" x2="16" y2="16"/><line x1="16" y1="8" x2="8" y2="16"/></svg>',

    // ---- Brand Icons ----
    'logo-compass': '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="12" stroke-dasharray="2 3"/><circle cx="16" cy="16" r="5"/><line x1="16" y1="4" x2="16" y2="9"/><line x1="4" y1="16" x2="9" y2="16"/><line x1="28" y1="16" x2="23" y2="16"/><line x1="16" y1="23" x2="16" y2="28"/></svg>',

    // ---- OAuth/App Icons ----
    'app': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="9" cy="9" r="2"/><path d="M3 17l5-5 4 4 4-4"/></svg>',

    device: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="18" x2="16" y2="18"/></svg>',

    // ---- Automation Icons ----
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><polyline points="12 7 12 12 16 14"/></svg>',

    'rotate': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>',
  };

  /**
   * Get an icon SVG string by name
   * @param {string} name - Icon name
   * @returns {string} SVG string or empty string
   */
  function getIcon(name) {
    return Icons[name] || '';
  }

  /**
   * Get an icon wrapped in a span with specified class
   * @param {string} name - Icon name
   * @param {string} className - CSS class for the wrapper span
   * @returns {string} HTML string
   */
  function getIconHTML(name, className) {
    var icon = getIcon(name);
    if (!icon) return '';
    className = className || 'icon';
    return '<span class="' + className + '">' + icon + '</span>';
  }

  /**
   * Render an icon into a DOM element
   * @param {string} name - Icon name
   * @param {HTMLElement} element - Target element
   */
  function renderIcon(name, element) {
    var icon = getIcon(name);
    if (icon && element) {
      element.innerHTML = icon;
    }
  }

  /**
   * Auto-render all elements with [data-icon] attribute
   */
  function autoRender(root) {
    root = root || document;
    var elements = root.querySelectorAll('[data-icon]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var name = el.getAttribute('data-icon');
      if (name) {
        renderIcon(name, el);
      }
    }
  }

  // Auto-render on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { autoRender(); });
  } else {
    autoRender();
  }

  // Watch for dynamic content
  if (window.MutationObserver) {
    var observer = new MutationObserver(function (mutations) {
      var shouldRender = false;
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].type === 'childList') {
          for (var j = 0; j < mutations[i].addedNodes.length; j++) {
            var node = mutations[i].addedNodes[j];
            if (node.nodeType === 1) {
              if (node.hasAttribute && node.hasAttribute('data-icon')) {
                shouldRender = true;
                break;
              }
              if (node.querySelectorAll && node.querySelectorAll('[data-icon]').length > 0) {
                shouldRender = true;
                break;
              }
            }
          }
        }
        if (shouldRender) break;
      }
      if (shouldRender) autoRender();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ============================================================
  // Public API
  // ============================================================
  window.Icons = {
    getIcon: getIcon,
    getIconHTML: getIconHTML,
    renderIcon: renderIcon,
    autoRender: autoRender,
    icons: Icons
  };
})();