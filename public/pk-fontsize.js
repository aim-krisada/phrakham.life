/* pk-fontsize.js — reusable reader font-size core.
 * Shared, framework-agnostic library for phrakham.life AND pleng.phrakham.life.
 *
 * WHAT IT OWNS (and ALL it owns)
 *   The STATE of a reader-controlled text size: an ascending list of scale factors,
 *   clamping, localStorage persistence, and writing ONE CSS custom property (default
 *   --pk-fs) that the stylesheet multiplies its reading-text sizes by. It renders NO
 *   UI — the caller builds the buttons (phrakham's navbar tool, a pleng Vue control,
 *   …) and drives this controller. This keeps the +/- logic identical everywhere.
 *
 * WHY A CSS VARIABLE (not a JS font-size sweep)
 *   Text scaled through a variable REFLOWS on every device — the wrap that iPad
 *   pinch-zoom can't do (it only pans) — and reaching 2.0 satisfies WCAG 2.2 resize.
 *   How the variable is consumed is the stylesheet's business: font-size on a reading
 *   root, or `zoom` on a static content column. This library doesn't care.
 *
 * USE (vanilla / phrakham)
 *   <script src="/assets/pk-fontsize.js"></script>
 *   var fs = PKFontSize.create();                     // defaults below
 *   minusBtn.onclick = function(){ fs.dec(); };
 *   plusBtn.onclick  = function(){ fs.inc(); };
 *   fs.onChange(function(scale, pct){ label.textContent = pct + '%'; });
 *
 * USE (bundler / pleng — Vue, Supabase)
 *   import PKFontSize from './pk-fontsize.js';         // also exports as a module
 *   const fs = PKFontSize.create({ target: document.documentElement });
 *   wrap it in a composable; bind pct()/canInc()/canDec() to your control.
 *
 * NO-FLASH PRE-PAINT
 *   The saved size must be on the element BEFORE first paint or the page resizes
 *   visibly on load. Either load this file in <head> and call PKFontSize.applyStored()
 *   there, or inline the one-liner it runs (see applyStored) directly in the <head>.
 *
 * API
 *   PKFontSize.create(opts) -> controller
 *     opts.steps      scale factors, ascending, SHOULD include 1  (default DEFAULT_STEPS)
 *     opts.storageKey localStorage key                            (default 'pk-fs')
 *     opts.cssVar     CSS custom property to write                (default '--pk-fs')
 *     opts.target     element to set the property on              (default <html>)
 *     opts.persist    save changes to localStorage               (default true)
 *   controller.scale()  current factor (e.g. 1.15)
 *   controller.pct()    current percent, integer (e.g. 115)
 *   controller.canInc() / controller.canDec()   at a bound?
 *   controller.inc() / dec() / reset() / setScale(f)   apply + persist + notify; return scale()
 *   controller.onChange(fn)  fn(scale, pct) after every change; returns an unsubscribe fn
 *   controller.apply()  re-write the CSS var from the current state (e.g. after target swap)
 *
 *   PKFontSize.applyStored(opts?)  read storageKey and write cssVar on target — call
 *     in <head> before paint. opts: { storageKey, cssVar, target }. Dependency-free.
 *   PKFontSize.DEFAULT_STEPS  [0.85, 1, 1.15, 1.30, 1.50, 1.75, 2.0]  (85% … 200%)
 */
(function (global) {
  var DEFAULT_STEPS = [0.85, 1, 1.15, 1.30, 1.50, 1.75, 2.0];

  function readNumber(key) {
    try { var s = localStorage.getItem(key); return s == null ? null : (parseFloat(s) || null); } catch (e) { return null; }
  }
  function write(target, cssVar, scale) {
    if (target && target.style) target.style.setProperty(cssVar, String(scale));
  }

  function create(opts) {
    opts = opts || {};
    var steps = (opts.steps && opts.steps.length) ? opts.steps.slice() : DEFAULT_STEPS.slice();
    var key = opts.storageKey || 'pk-fs';
    var cssVar = opts.cssVar || '--pk-fs';
    var target = opts.target || (global.document && global.document.documentElement) || null;
    var persist = opts.persist !== false;
    var listeners = [];

    function clamp(i) { return i < 0 ? 0 : (i >= steps.length ? steps.length - 1 : i); }
    function nearest(v) {
      var bi = 0, bd = Infinity;
      for (var i = 0; i < steps.length; i++) { var d = Math.abs(steps[i] - v); if (d < bd) { bd = d; bi = i; } }
      return bi;
    }
    // start at the saved value (snapped to the nearest step), else the step closest to 1.0
    var stored = readNumber(key);
    var idx = stored != null ? nearest(stored) : nearest(1);

    function scale() { return steps[idx]; }
    function pct() { return Math.round(steps[idx] * 100); }

    function emit() { for (var i = 0; i < listeners.length; i++) { try { listeners[i](scale(), pct()); } catch (e) { } } }
    function apply(save) {
      write(target, cssVar, scale());
      if (save && persist) { try { localStorage.setItem(key, String(scale())); } catch (e) { } }
      emit();
      return scale();
    }
    function setIdx(i, save) { idx = clamp(i); return apply(save); }

    var ctrl = {
      scale: scale,
      pct: pct,
      steps: function () { return steps.slice(); },
      canDec: function () { return idx > 0; },
      canInc: function () { return idx < steps.length - 1; },
      inc: function () { return setIdx(idx + 1, true); },
      dec: function () { return setIdx(idx - 1, true); },
      reset: function () { return setIdx(nearest(1), true); },
      setScale: function (f) { return setIdx(nearest(f), true); },
      apply: function () { return apply(false); },   // re-assert the var without persisting (idempotent)
      onChange: function (fn) {
        if (typeof fn !== 'function') return function () { };
        listeners.push(fn);
        return function () { var k = listeners.indexOf(fn); if (k >= 0) listeners.splice(k, 1); };
      }
    };
    // Assert the CSS var immediately so the controller and the (pre-paint) DOM agree.
    apply(false);
    return ctrl;
  }

  // Pre-paint helper: set the saved size on the target before first paint (no flash).
  function applyStored(opts) {
    opts = opts || {};
    var key = opts.storageKey || 'pk-fs';
    var cssVar = opts.cssVar || '--pk-fs';
    var target = opts.target || (global.document && global.document.documentElement) || null;
    var v = readNumber(key);
    if (v != null) write(target, cssVar, v);
    return v;
  }

  var api = { create: create, applyStored: applyStored, DEFAULT_STEPS: DEFAULT_STEPS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;   // bundlers (pleng)
  global.PKFontSize = api;                                                     // <script> (phrakham)
})(typeof window !== 'undefined' ? window : this);
