(function() {
  'use strict';

  const SIDEBAR_SELECTOR = '.sidebar-scroll';
  const STORAGE_KEY = 'furoSidebarScroll';

  function getSidebar() {
    return document.querySelector(SIDEBAR_SELECTOR);
  }

  var restoring = false;

  function saveScroll() {
    if (restoring) {
      return;
    }
    var el = getSidebar();
    if (!el) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(el.scrollTop));
    } catch (e) {
      /* Ignore storage errors. */
    }
  }

  function restoreScroll() {
    /* If a protection loop is already running, do not start another. */
    if (restoring) return;

    var el = getSidebar();
    if (!el) return;

    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return;

    var target = parseInt(saved, 10);
    if (isNaN(target)) return;

    restoring = true;

    /*
     * Let the user take over at any point (wheel, click, touch) so the
     * protection loop never blocks real interaction.
     */
    function onUserInput() {
      restoring = false;
      el.removeEventListener('wheel', onUserInput);
      el.removeEventListener('pointerdown', onUserInput);
      el.removeEventListener('touchstart', onUserInput);
    }
    el.addEventListener('wheel', onUserInput, { passive: true, once: true });
    el.addEventListener('pointerdown', onUserInput, { passive: true, once: true });
    el.addEventListener('touchstart', onUserInput, { passive: true, once: true });

    /*
     * Set immediately so the first paint shows the saved position.
     * Use scrollTo({behavior:'instant'}) to bypass Furo's CSS scroll-behavior:smooth.
     */
    el.scrollTo({top: target, behavior: 'instant'});

    var attempts = 0;
    var maxAttempts = 180; /* ~3 seconds at 60 fps */

    function tryRestore() {
      if (restoring && el.scrollTop !== target) {
        el.scrollTo({top: target, behavior: 'instant'});
      }
      attempts += 1;
      if (attempts < maxAttempts && restoring) {
        requestAnimationFrame(tryRestore);
      } else {
        restoring = false;
      }
    }

    requestAnimationFrame(tryRestore);
  }

  var el = getSidebar();
  if (el) {
    el.addEventListener('scroll', saveScroll, { passive: true });

    /*
     * Furo's sidebar toctree uses href="#" for expand/collapse headings.
     * Clicking them scrolls the page to the top, which also resets the
     * sidebar position. Prevent that default behaviour.
     */
    el.addEventListener('click', function(e) {
      var link = e.target.closest('a[href="#"]');
      if (link) {
        e.preventDefault();
      }
    });
  }

  /*
   * pageshow fires for normal loads and pages restored from bfcache,
   * making it the most reliable single event for scroll restoration.
   */
  window.addEventListener('pageshow', restoreScroll);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restoreScroll);
  } else {
    restoreScroll();
  }

  /* Safety net: save one last time before navigating away. */
  window.addEventListener('beforeunload', function() {
    var el = getSidebar();
    if (!el) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(el.scrollTop));
    } catch (e) {
      /* Ignore storage errors. */
    }
  });
})();
