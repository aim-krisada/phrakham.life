// Emoji tooltip — phrakham.life
// Phase 1: Auto-detect emojis in content → wrap with tooltip spans
// Phase 2: Attach event listeners (hover, click, focus, dismiss)

// --- Phase 1: Auto-detect ---
(function() {
  if (!window.SYMBOLS_DATA) return;

  var container = document.querySelector('.post-content') || document.querySelector('.symbols-content');
  if (!container) return;

  // Build emoji → data map (skip non-emoji like "*")
  var emojiMap = {};
  var emojis = [];

  window.SYMBOLS_DATA.forEach(function(s) {
    emojiMap[s.emoji] = s;
    // Also map without variation selector (U+FE0F) for resilient matching
    var stripped = s.emoji.replace(/\uFE0F/g, '');
    if (stripped !== s.emoji) {
      emojiMap[stripped] = s;
    }
    emojis.push(s.emoji);
  });

  // Sort longest first (match ZWJ sequences before their parts)
  emojis.sort(function(a, b) { return b.length - a.length; });

  // Build regex
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  var pattern = new RegExp(
    '(' + emojis.map(escapeRegex).join('|') + ')\\uFE0F?',
    'g'
  );

  // Collect text nodes (skip nodes already inside .emoji-symbol)
  var walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (node.parentElement && node.parentElement.closest('.emoji-symbol')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  var textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(function(textNode) {
    var text = textNode.textContent;
    pattern.lastIndex = 0;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;

    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var match;

    while ((match = pattern.exec(text)) !== null) {
      var matchedEmoji = match[1];
      var sym = emojiMap[matchedEmoji] || emojiMap[matchedEmoji.replace(/\uFE0F/g, '')];
      if (!sym) continue;

      // Text before match
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      // Create tooltip span
      var span = document.createElement('span');
      span.className = 'emoji-symbol';
      span.setAttribute('role', 'img');
      span.setAttribute('aria-label', sym.name + ': ' + sym.thai);
      span.setAttribute('tabindex', '0');
      span.setAttribute('data-symbol-code', sym.code);

      var tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.innerHTML =
        '<span class="tooltip-title">' + sym.emoji + ' ' + sym.thai + '</span>' +
        '<span class="tooltip-name">' + sym.name + '</span>' +
        '<a href="' + (window.SITE_BASEURL || '') + '/symbols/#' + sym.anchor + '" class="tooltip-link">ดูสัญลักษณ์ทั้งหมด</a>';

      var emojiChar = document.createElement('span');
      emojiChar.className = 'emoji-char';
      emojiChar.setAttribute('aria-hidden', 'true');
      emojiChar.textContent = sym.emoji;
      tooltip.setAttribute('aria-hidden', 'true');
      span.appendChild(emojiChar);
      span.appendChild(tooltip);
      fragment.appendChild(span);

      lastIndex = pattern.lastIndex;
    }

    // Remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (lastIndex > 0) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });

  // Phase 1.5: Absorb adjacent <strong> into emoji-symbol span
  // Markdown "♾️**ask**" renders as: <emoji-symbol>♾️</emoji-symbol><strong>ask</strong>
  // We move <strong> inside the span so hovering the red word also triggers tooltip
  container.querySelectorAll('.emoji-symbol').forEach(function(span) {
    var next = span.nextSibling;
    if (next && next.nodeType === 1 && next.tagName === 'STRONG') {
      var tooltip = span.querySelector('.tooltip');
      span.insertBefore(next, tooltip);
    }
  });
})();

// --- Phase 1.8: Etymology section wrapper ---
(function() {
  var container = document.querySelector('.post-content');
  if (!container) return;

  container.querySelectorAll('h3').forEach(function(h3) {
    if (h3.textContent.trim() === 'รากศัพท์') {
      var ul = h3.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        var wrapper = document.createElement('div');
        wrapper.className = 'etymology-section';
        h3.parentNode.insertBefore(wrapper, h3);
        wrapper.appendChild(h3);
        wrapper.appendChild(ul);
      }
    }
  });
})();

// --- Phase 1.9: Add lang attributes for TTS ---
(function() {
  var container = document.querySelector('.post-content');
  if (!container) return;

  container.querySelectorAll('blockquote').forEach(function(bq) {
    bq.setAttribute('lang', 'en');
  });
})();

// --- Phase 3: Wrap original language references ---
// Detect (GreekWord / transliteration) and (HebrewWord / transliteration)
// Wraps in <span class="original-lang-ref"> so reading mode can hide them
(function() {
  var container = document.querySelector('.post-content');
  if (!container) return;

  // Match parentheses containing Greek (\u0370-\u03FF, \u1F00-\u1FFF) or Hebrew (\u0590-\u05FF) characters
  var langPattern = /\([^)]*[\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF][^)]*\)/g;

  // Collect text nodes (skip already-wrapped elements)
  var walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (node.parentElement && (
          node.parentElement.closest('.original-lang-ref') ||
          node.parentElement.closest('.tooltip') ||
          node.parentElement.closest('blockquote')
        )) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  var textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(function(textNode) {
    var text = textNode.textContent;
    langPattern.lastIndex = 0;
    if (!langPattern.test(text)) return;
    langPattern.lastIndex = 0;

    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var match;

    while ((match = langPattern.exec(text)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      // Wrap in span — WCAG 3.1.2: detect Greek vs Hebrew for lang
      var span = document.createElement('span');
      span.className = 'original-lang-ref';
      var hasHebrew = /[\u0590-\u05FF]/.test(match[0]);
      span.setAttribute('lang', hasHebrew ? 'he' : 'el');
      span.textContent = match[0];
      fragment.appendChild(span);

      lastIndex = langPattern.lastIndex;
    }

    // Remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (lastIndex > 0) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
})();

// --- Phase 3.5: Wrap bare inline Greek/Hebrew ---
// Wraps in <span class="foreign-script"> so focus mode can dim them
(function() {
  var container = document.querySelector('.post-content');
  if (!container) return;

  // Match runs of Greek (\u0370-\u03FF, \u1F00-\u1FFF) or Hebrew (\u0590-\u05FF)
  // including accents, combining marks, and spaces between words
  var scriptPattern = /[\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF][\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF\u0300-\u036F\s]*/g;

  var walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (node.parentElement && (
          node.parentElement.closest('.original-lang-ref') ||
          node.parentElement.closest('.foreign-script') ||
          node.parentElement.closest('.tooltip') ||
          node.parentElement.closest('.emoji-symbol') ||
          node.parentElement.closest('blockquote')
        )) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  var textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(function(textNode) {
    var text = textNode.textContent;
    scriptPattern.lastIndex = 0;
    if (!scriptPattern.test(text)) return;
    scriptPattern.lastIndex = 0;

    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var match;

    while ((match = scriptPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      var span = document.createElement('span');
      span.className = 'foreign-script';
      // WCAG 3.1.2: set lang for screen readers — detect Greek vs Hebrew
      var firstChar = match[0].charCodeAt(0);
      span.setAttribute('lang', (firstChar >= 0x0590 && firstChar <= 0x05FF) ? 'he' : 'el');
      span.textContent = match[0];
      fragment.appendChild(span);
      lastIndex = scriptPattern.lastIndex;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (lastIndex > 0) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
})();

// --- Phase 3.7: Wrap parenthesized English grammar terms ---
// Wraps e.g. (Present Imperative), (Greek Perfect) in <span class="english-term">
// so focus mode can hide them for TTS-clean Thai reading
(function() {
  var container = document.querySelector('.post-content');
  if (!container) return;

  // Match (CapitalizedWord ...) — at least one capital start + lowercase
  // Excludes: (ESV), (TTS) — all-caps; (age) — lowercase start; Greek parens — already wrapped
  var engPattern = /\([A-Z][a-z]+(?:\s[A-Za-z]+)*\)/g;

  var walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (node.parentElement && (
          node.parentElement.closest('.original-lang-ref') ||
          node.parentElement.closest('.foreign-script') ||
          node.parentElement.closest('.english-term') ||
          node.parentElement.closest('.tooltip') ||
          node.parentElement.closest('.emoji-symbol') ||
          node.parentElement.closest('blockquote')
        )) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  var textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(function(textNode) {
    var text = textNode.textContent;
    engPattern.lastIndex = 0;
    if (!engPattern.test(text)) return;
    engPattern.lastIndex = 0;

    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var match;

    while ((match = engPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      var span = document.createElement('span');
      span.className = 'english-term';
      span.setAttribute('lang', 'en');
      span.textContent = match[0];
      fragment.appendChild(span);
      lastIndex = engPattern.lastIndex;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (lastIndex > 0) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
})();

// --- Focus Mode FAB ---
// Floating Action Button (bottom-right) on study guide pages only
// Toggles between Study mode (full content) and Reading mode (Thai-only for TTS)
(function() {
  // Only inject FAB on study guide pages (.post-content)
  var contentArea = document.querySelector('.post-content');
  if (!contentArea) return;

  // --- Toast notification ---
  var toastEl = document.createElement('div');
  toastEl.id = 'mode-toast';
  toastEl.className = 'mode-toast';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);

  var toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.remove('show');
    void toastEl.offsetWidth; // force reflow for re-trigger
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toastEl.classList.remove('show');
    }, 2000);
  }

  // --- Scroll preservation ---
  function getAnchorElement() {
    var midY = window.innerHeight / 2;
    var els = contentArea.querySelectorAll('h2, h3, p');
    var closest = null;
    var closestDist = Infinity;
    for (var i = 0; i < els.length; i++) {
      var rect = els[i].getBoundingClientRect();
      var dist = Math.abs(rect.top - midY);
      if (dist < closestDist) {
        closestDist = dist;
        closest = els[i];
      }
    }
    return closest;
  }

  function preserveScroll(fn) {
    var anchor = getAnchorElement();
    var offset = anchor ? anchor.getBoundingClientRect().top : 0;
    fn();
    if (anchor) {
      window.scrollBy(0, anchor.getBoundingClientRect().top - offset);
    }
  }

  // --- Build FAB ---
  var fabBtn = document.createElement('button');
  fabBtn.className = 'fab-btn fab-reading';
  fabBtn.setAttribute('aria-label', 'สลับเป็นโหมดอ่าน');
  fabBtn.setAttribute('title', 'สลับเป็นโหมดอ่าน');
  fabBtn.setAttribute('aria-pressed', 'false');
  fabBtn.setAttribute('data-mode', 'study');
  fabBtn.innerHTML = '<span class="fab-icon">\uD83C\uDFA7</span>';
  document.body.appendChild(fabBtn);

  // --- Focus mode state ---
  var isFocusMode = false;

  function setAriaHidden(hide) {
    var val = hide ? 'true' : 'false';
    var selectors = ['blockquote', '.original-lang-ref', '.foreign-script', '.english-term', '.etymology-section', '.study-only'];
    selectors.forEach(function(sel) {
      contentArea.querySelectorAll(sel).forEach(function(el) {
        el.setAttribute('aria-hidden', val);
      });
    });
    // reading-only: inverse — visible when reading mode is active
    contentArea.querySelectorAll('.reading-only').forEach(function(el) {
      el.setAttribute('aria-hidden', hide ? 'false' : 'true');
    });
  }

  function activateFocusMode(silent) {
    isFocusMode = true;
    contentArea.classList.add('reading-mode');
    fabBtn.setAttribute('aria-pressed', 'true');
    fabBtn.setAttribute('data-mode', 'read');
    fabBtn.setAttribute('aria-label', 'สลับเป็นโหมดศึกษา');
    fabBtn.setAttribute('title', 'สลับเป็นโหมดศึกษา');
    fabBtn.innerHTML = '<span class="fab-icon">\uD83D\uDCD6</span>';
    setAriaHidden(true);
    localStorage.setItem('reading-mode', 'true');
    if (!silent) showToast('เข้าสู่โหมดเน้นภาษาไทย (พร้อมฟัง)');
  }

  function deactivateFocusMode(silent) {
    isFocusMode = false;
    contentArea.classList.remove('reading-mode');
    fabBtn.setAttribute('aria-pressed', 'false');
    fabBtn.setAttribute('data-mode', 'study');
    fabBtn.setAttribute('aria-label', 'สลับเป็นโหมดอ่าน');
    fabBtn.setAttribute('title', 'สลับเป็นโหมดอ่าน');
    fabBtn.innerHTML = '<span class="fab-icon">\uD83C\uDFA7</span>';
    setAriaHidden(false);
    localStorage.setItem('reading-mode', 'false');
    if (!silent) showToast('เข้าสู่โหมดศึกษา (แสดงข้อมูลเต็ม)');
  }

  // Restore saved preference (silent — no toast on page load)
  if (localStorage.getItem('reading-mode') === 'true') {
    activateFocusMode(true);
  }

  fabBtn.addEventListener('click', function() {
    preserveScroll(function() {
      if (isFocusMode) { deactivateFocusMode(); }
      else { activateFocusMode(); }
    });
  });
})();

// --- Phase 2: Event listeners ---
// WCAG 1.4.13: Dismissible, Hoverable, Persistent, Focusable
(function() {
  var activeTooltip = null;

  function repositionTooltip(el) {
    var tooltip = el.querySelector('.tooltip');
    if (!tooltip) return;

    // Reset any previous reposition
    tooltip.classList.remove('tooltip-below');
    tooltip.style.left = '';
    tooltip.style.transform = '';

    // Use visibility trick to measure without flicker (Gemini suggestion)
    var origDisplay = tooltip.style.display;
    tooltip.style.visibility = 'hidden';
    tooltip.style.display = 'block';

    var rect = tooltip.getBoundingClientRect();
    var pad = 8; // viewport edge padding

    // Vertical: flip below if clipped at top
    if (rect.top < pad) {
      tooltip.classList.add('tooltip-below');
    }

    // Horizontal: shift if clipped at left/right
    var updatedRect = tooltip.getBoundingClientRect();
    if (updatedRect.left < pad) {
      var shift = pad - updatedRect.left;
      tooltip.style.transform = 'translateX(calc(-50% + ' + shift + 'px))';
    } else if (updatedRect.right > window.innerWidth - pad) {
      var shift = updatedRect.right - window.innerWidth + pad;
      tooltip.style.transform = 'translateX(calc(-50% - ' + shift + 'px))';
    }

    // Reveal
    tooltip.style.display = origDisplay;
    tooltip.style.visibility = '';
  }

  function resetTooltipPosition(el) {
    var tooltip = el.querySelector('.tooltip');
    if (!tooltip) return;
    tooltip.classList.remove('tooltip-below');
    tooltip.style.left = '';
    tooltip.style.transform = '';
  }

  function showTooltip(el) {
    hideAll();
    el.classList.add('active');
    activeTooltip = el;
    repositionTooltip(el);
  }

  function hideAll() {
    if (activeTooltip) {
      resetTooltipPosition(activeTooltip);
      activeTooltip.classList.remove('active');
      activeTooltip = null;
    }
  }

  // Dismiss on resize/rotate — simpler than recalculating (Gemini suggestion)
  window.addEventListener('resize', function() { hideAll(); });

  // All emoji symbols (including auto-detected ones from Phase 1)
  var symbols = document.querySelectorAll('.emoji-symbol');
  var isTouch = false;

  symbols.forEach(function(el) {
    // Touch: show/hide on tap directly via touchend (reliable on all mobile browsers)
    el.addEventListener('touchend', function(e) {
      // Let tooltip links navigate normally
      if (e.target.closest('.tooltip-link')) return;
      e.preventDefault();
      isTouch = true;
      if (el.classList.contains('active')) {
        hideAll();
      } else {
        showTooltip(el);
      }
    });

    // Desktop: show on hover
    el.addEventListener('mouseenter', function() {
      if (isTouch) { isTouch = false; return; }
      showTooltip(el);
    });

    el.addEventListener('mouseleave', function(e) {
      var tooltip = el.querySelector('.tooltip');
      if (tooltip) {
        setTimeout(function() {
          if (!el.matches(':hover') && !tooltip.matches(':hover')) {
            el.classList.remove('active');
            if (activeTooltip === el) activeTooltip = null;
          }
        }, 100);
      }
    });

    // Desktop: toggle on click
    el.addEventListener('click', function(e) {
      if (isTouch) return; // Already handled by touchend
      // Let tooltip links navigate normally
      if (e.target.closest('.tooltip-link')) return;
      e.preventDefault();
      e.stopPropagation();
      if (el.classList.contains('active')) {
        hideAll();
      } else {
        showTooltip(el);
      }
    });

    el.addEventListener('focus', function() {
      showTooltip(el);
    });

    el.addEventListener('blur', function() {
      setTimeout(function() {
        if (!el.contains(document.activeElement)) {
          el.classList.remove('active');
          if (activeTooltip === el) activeTooltip = null;
        }
      }, 150);
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideAll();
    }
  });

  document.addEventListener('click', function(e) {
    if (activeTooltip && !activeTooltip.contains(e.target)) {
      hideAll();
    }
  });

  // --- Desktop nav dropdown (click-based) ---
  var navDropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
  navDropdownBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var dropdown = btn.closest('.nav-dropdown');
      var wasOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
        d.classList.remove('open');
      });
      if (!wasOpen) {
        dropdown.classList.add('open');
      }
      btn.setAttribute('aria-expanded', !wasOpen);
    });
  });

  document.addEventListener('click', function() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
      d.classList.remove('open');
      var btn = d.querySelector('.nav-dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
        d.classList.remove('open');
        var btn = d.querySelector('.nav-dropdown-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
    }
  });

  // --- Mobile menu ---
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileClose = document.getElementById('mobile-menu-close');

  if (hamburger && mobileMenu) {
    function openMobileMenu() {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      if (mobileClose) mobileClose.focus();
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }

    hamburger.addEventListener('click', openMobileMenu);

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileMenu);
    }

    // Focus trap: keep Tab/Shift+Tab inside mobile menu (WCAG 2.4.3)
    mobileMenu.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { closeMobileMenu(); return; }
      if (e.key !== 'Tab') return;

      var focusable = mobileMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    var dropdownToggles = mobileMenu.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        var sub = toggle.nextElementSibling;
        if (sub) {
          var isOpen = sub.style.display !== 'none';
          sub.style.display = isOpen ? 'none' : 'block';
          toggle.setAttribute('aria-expanded', !isOpen);
        }
      });
    });
  }
})();
