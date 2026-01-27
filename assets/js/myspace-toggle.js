/**
 * MySpace Mode Toggle
 * Toggles the early 2000s MySpace theme on the home page
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'myspace-mode';
  var toggleBtn = null;

  function isMySpaceMode() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  function setMySpaceMode(enabled) {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
    updateBodyClass(enabled);
    updateButtonText(enabled);
  }

  function updateBodyClass(enabled) {
    if (enabled) {
      document.body.classList.add('myspace-mode');
    } else {
      document.body.classList.remove('myspace-mode');
    }
  }

  function updateButtonText(enabled) {
    if (toggleBtn) {
      toggleBtn.textContent = enabled ? '😎' : '😉';
      toggleBtn.title = enabled ? 'Exit MySpace Mode' : 'Enter MySpace Mode';
    }
  }

  function toggleMySpaceMode() {
    var currentMode = isMySpaceMode();
    setMySpaceMode(!currentMode);
  }

  function init() {
    toggleBtn = document.getElementById('myspace-toggle-btn');

    if (!toggleBtn) {
      return; // Not on a page with the toggle button
    }

    // Restore saved preference
    var savedMode = isMySpaceMode();
    updateBodyClass(savedMode);
    updateButtonText(savedMode);

    // Attach click handler
    toggleBtn.addEventListener('click', toggleMySpaceMode);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
