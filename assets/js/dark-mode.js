// Dark mode dropdown — phrakham.life
(function() {
  function getTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Mark active option
    document.querySelectorAll('.theme-option').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-value') === theme);
    });
  }

  // Apply on load
  applyTheme(getTheme());

  // Listen for clicks on theme options (both desktop and mobile)
  document.addEventListener('click', function(e) {
    var option = e.target.closest('.theme-option');
    if (option) {
      e.preventDefault();
      applyTheme(option.getAttribute('data-value'));
      // Close dropdown
      var dropdown = option.closest('.nav-dropdown');
      if (dropdown) {
        dropdown.classList.remove('open');
        var btn = dropdown.querySelector('.nav-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
