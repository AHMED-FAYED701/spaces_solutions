/*
 * Spaces Solutions — Generic World-Space Runtime
 *
 * Page-specific geometry lives in js/home.js.
 * This file executes that geometry only.
 *
 * Camera law:
 *
 *   translate = -(cameraOrigin - viewportCentre)
 */

(function () {
  "use strict";

  var DATA = window.SPACES_HOME;

  if (!DATA) {
    console.error("SPACES_HOME data is missing.");
    return;
  }

  var SVG_NS = "http://www.w3.org/2000/svg";

  var world = null;
  var camera = null;
  var signalRuns = [];
  var pxPerUnit = 1;
  var lastBaseOrigin = { x: 0, y: 0 };
  var lastProgress = 0;
  var cameraOverride = {
    active: false,
    x: 0,
    y: 0,
    tween: null
  };

  var MOBILE_MAX = 820;

  function clamp01(v) {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
  }

  /*
   * Build an invisible SVG path so the browser can give us:
   *
   * - exact camera arc length
   * - exact camera point at any arc position
   *
   * The camera path itself is never drawn.
   */
  function buildCamera(pathD) {
    var svg = document.createElementNS(SVG_NS, "svg");
    var path = document.createElementNS(SVG_NS, "path");

    svg.setAttribute(
      "style",
      "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none"
    );

    path.setAttribute("d", pathD);

    svg.appendChild(path);
    document.body.appendChild(svg);

    var length = path.getTotalLength();

    return {
      svg: svg,
      path: path,
      len: length,

      pointAt: function (distance) {
        var d = Math.max(0, Math.min(length, distance));
        var p = path.getPointAtLength(d);

        return {
          x: p.x,
          y: p.y
        };
      }
    };
  }

  function destroyCamera() {
    if (camera && camera.svg && camera.svg.parentNode) {
      camera.svg.parentNode.removeChild(camera.svg);
    }

    camera = null;
  }

  /*
   * Bind rendered signal paths to the authored signal data.
   *
   * index.html will render one SVG group per signal piece with:
   *
   *   data-signal-piece="hero-source"
   *
   * Each group contains halo / glow / core paths sharing the same geometry.
   */
  function bindSignal() {
    signalRuns = DATA.signal.pieces.map(function (piece) {
      var selector =
        '[data-signal-piece="' + piece.key + '"] path';

      var paths = Array.prototype.slice.call(
        document.querySelectorAll(selector)
      );

      var runs = paths.map(function (path) {
        var len = path.getTotalLength();

        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);

        return {
          el: path,
          len: len
        };
      });

      return {
        piece: piece,
        runs: runs
      };
    });
  }

  function revealAllSignal() {
    signalRuns.forEach(function (group) {
      group.runs.forEach(function (run) {
        run.el.style.strokeDashoffset = "0";
      });
    });
  }

  /*
   * Header / global state when the camera enters a declared ground zone.
   */
  function applyGroundState(ox, oy) {
    var zones = DATA.groundZones || [];
    var activeClasses = {};

    zones.forEach(function (zone) {
      activeClasses[zone.className] = true;

      var inside =
        ox >= zone.x0 &&
        ox <= zone.x1 &&
        oy >= zone.y0 &&
        oy <= zone.y1;

      document.body.classList.toggle(zone.className, inside);
    });

    /*
     * Ensure known ground classes cannot remain stuck when leaving all zones.
     */
    Object.keys(activeClasses).forEach(function (className) {
      var insideAny = zones.some(function (zone) {
        return (
          zone.className === className &&
          ox >= zone.x0 &&
          ox <= zone.x1 &&
          oy >= zone.y0 &&
          oy <= zone.y1
        );
      });

      if (!insideAny) {
        document.body.classList.remove(className);
      }
    });
  }

  /*
   * Move the world so the authored camera point sits at viewport centre.
   */
  function renderCameraOrigin(origin) {
    var viewportCentreX =
      window.innerWidth / 2 / pxPerUnit;

    var viewportCentreY =
      window.innerHeight / 2 / pxPerUnit;

    var tx =
      -(origin.x - viewportCentreX) * pxPerUnit;

    var ty =
      -(origin.y - viewportCentreY) * pxPerUnit;

    world.style.transform =
      "translate3d(" +
      tx.toFixed(3) +
      "px," +
      ty.toFixed(3) +
      "px,0)";

    applyGroundState(origin.x, origin.y);
  }

  function applyCamera(arc) {
    var origin = camera.pointAt(arc);

    lastBaseOrigin = {
      x: origin.x,
      y: origin.y
    };

    if (!cameraOverride.active) {
      renderCameraOrigin(origin);
    }

    return origin;
  }

  /*
   * Reveal signal pieces using their Mastermind-authored windows.
   *
   * HOLD windows use hero hold progress.
   * ARC windows use normalized camera arc progress.
   */
  function applySignal(holdProgress, arcProgress) {
    signalRuns.forEach(function (group) {
      var windowData = group.piece.window;

      if (!windowData) {
        group.runs.forEach(function (run) {
          run.el.style.strokeDashoffset = "0";
        });

        return;
      }

      var source =
        windowData.mode === "hold"
          ? holdProgress
          : arcProgress;

      var range =
        windowData.to - windowData.from;

      var progress =
        range === 0
          ? 1
          : clamp01(
              (source - windowData.from) /
              range
            );

      group.runs.forEach(function (run) {
        run.el.style.strokeDashoffset =
          String(run.len * (1 - progress));
      });
    });
  }

  /*
   * One normalized ScrollTrigger progress value drives:
   *
   * 1. hero hold
   * 2. camera arc
   * 3. authored visible-signal windows
   */
  function apply(progress) {
    lastProgress = progress;

    var holdUnits =
      DATA.scroll.holdScreens *
      (window.innerHeight / pxPerUnit);

    var totalUnits =
      holdUnits + camera.len;

    var travelled =
      clamp01(progress) * totalUnits;

    var holding =
      travelled < holdUnits;

    var holdProgress =
      holdUnits === 0
        ? 1
        : clamp01(travelled / holdUnits);

    var arc =
      holding
        ? 0
        : Math.min(
            camera.len,
            travelled - holdUnits
          );

    var arcProgress =
      camera.len === 0
        ? 1
        : clamp01(arc / camera.len);

    window.dispatchEvent(
      new CustomEvent("spaces:progress", {
        detail: {
          progress: progress,
          holdProgress: holdProgress,
          arcProgress: arcProgress,
          holding: holding
        }
      })
    );

    applyCamera(arc);
    applySignal(holdProgress, arcProgress);
  }

  function measure() {
    pxPerUnit =
      window.innerWidth /
      DATA.scale.viewportWidthUnits;
  }

  function desktopAllowed() {
    if (window.innerWidth <= MOBILE_MAX) {
      return false;
    }

    if (
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return false;
    }

    return true;
  }

  function startFallback() {
    document.body.classList.add("spatial-fallback");

    bindSignal();
    revealAllSignal();

    /*
     * Mobile CSS owns the stacked layout.
     * Do not apply world transforms.
     */
    if (world) {
      world.style.transform = "";
    }
  }

  function startDesktop() {
    if (
      typeof window.gsap === "undefined" ||
      typeof window.ScrollTrigger === "undefined"
    ) {
      console.error(
        "GSAP / ScrollTrigger missing. Falling back to static layout."
      );

      startFallback();
      return;
    }

    window.gsap.registerPlugin(
      window.ScrollTrigger
    );

    measure();

    camera = buildCamera(
      DATA.camera.path
    );

    bindSignal();

    /*
     * Expose measured values for browser validation.
     *
     * This is diagnostic only.
     */
    window.SPACES_RUNTIME = {
      cameraLength: camera.len,

      getPxPerUnit: function () {
        return pxPerUnit;
      },

      expectedPinPixels: function () {
        return (
          camera.len * pxPerUnit +
          DATA.scroll.holdScreens *
          window.innerHeight
        );
      },

      moveCameraTo: function (target, duration, ease, onComplete) {
        var start = cameraOverride.active
          ? { x: cameraOverride.x, y: cameraOverride.y }
          : lastBaseOrigin;

        if (cameraOverride.tween) {
          cameraOverride.tween.kill();
        }

        cameraOverride.x = start.x;
        cameraOverride.y = start.y;
        cameraOverride.active = true;

        cameraOverride.tween = window.gsap.to(cameraOverride, {
          x: target.x,
          y: target.y,
          duration: duration,
          ease: ease,
          onUpdate: function () {
            renderCameraOrigin(cameraOverride);
          },
          onComplete: function () {
            cameraOverride.tween = null;

            if (typeof onComplete === "function") {
              onComplete();
            }
          }
        });
      },

      releaseCameraOverride: function () {
        if (cameraOverride.tween) {
          cameraOverride.tween.kill();
          cameraOverride.tween = null;
        }

        cameraOverride.active = false;
        apply(lastProgress);
      },

      isCameraOverrideActive: function () {
        return cameraOverride.active;
      }
    };

    var state = {
      progress: 0
    };

    window.gsap.to(state, {
      progress: 1,
      ease: "none",

      onUpdate: function () {
        apply(state.progress);
      },

      scrollTrigger: {
        trigger: "#viewport",
        pin: "#viewport",
        start: "top top",

        end: function () {
          measure();

          var distance =
            camera.len * pxPerUnit +
            DATA.scroll.holdScreens *
              window.innerHeight;

          return "+=" + Math.round(distance);
        },

        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onRefresh: function () {
          measure();
          apply(state.progress);
        }
      }
    });

    apply(0);
  }

  function init() {
    world =
      document.getElementById("world");

    if (!world) {
      console.error("#world is missing.");
      return;
    }

    if (!desktopAllowed()) {
      startFallback();
      return;
    }

    startDesktop();
  }

  /*
   * Initialize after HTML, home.js and vendor scripts exist.
   */
  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

  window.addEventListener(
    "resize",
    function () {
      measure();

      if (
        typeof window.ScrollTrigger !==
        "undefined"
      ) {
        window.ScrollTrigger.refresh();
      }
    }
  );
})();
