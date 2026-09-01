/* Spaces Solutions — homepage division-route controller. */
(function () {
  "use strict";

  var DATA = window.SPACES_HOME;
  var activeRoute = "hub";
  var lastArcProgress = 0;
  var savedScrollY = 0;
  var savedOverflow = null;
  var routeRuns = {};
  var signalTween = null;
  var controls = [];
  var dcJourney = null;
  var dcRuns = [];
  var dcTargetY = 1530;
  var dcInputEnabled = false;
  var dcReturning = false;
  var itJourney = null;
  var itRuns = [];
  var itTargetY = 2030;
  var itInputEnabled = false;
  var itReturning = false;
  var avJourney = null;
  var avRuns = [];
  var avTargetY = 1340;
  var avVisualY = 1340;
  var avVisualState = { y: 1340 };
  var avMoveFrame = 0;
  var avSignalAnchors = [
    { y: 1340, p: 0.0000000000 },
    { y: 1710, p: 0.0508562694 },
    { y: 1800, p: 0.0661131503 },
    { y: 2060, p: 0.1806028546 },
    { y: 2380, p: 0.3314475708 },
    { y: 2700, p: 0.4822922869 },
    { y: 3020, p: 0.6331370031 },
    { y: 3340, p: 0.7839817193 },
    { y: 3660, p: 0.9348264355 },
    { y: 3790, p: 1.0000000000 }
  ];
  var avInputEnabled = false;
  var avReturning = false;
  var howSource = null;
  var howPaths = {};
  var howSignalRuns = {};
  var howTrunkRuns = [];
  var howInputEnabled = false;
  var howReturning = false;
  var howBackToHub = false;
  var howJourney = null;
  var howJourneyPath = null;
  var howPathLength = 0;
  var howTargetDistance = 0;
  var howRenderedDistance = 0;
  var howRenderState = { distance: 0 };
  var howRenderTween = null;
  var howProgress = 0;
  var howContinuousRuns = [];
  var howContinuousSignalLength = 0;
  var howWorkInputEnabled = false;
  var howWorkReturning = false;
  var howTransitioning = false;
  var howEntryTransitionTween = null;
  var howEntryWheelAccum = 0;
  var howWorkBackAccum = 0;
  var howQualDistance = 0;
  var howEntryElement = null;
  var howWorkElement = null;
  var howWorkGroundElements = [];
  var howWorkStageElements = [];
  var HOW_TRANSITION_DURATION = 1.05;
  var HOW_TRANSITION_THRESHOLD = 18;
  var whyJourney = null;
  var whyJourneyPath = null;
  var whyPathLength = 0;
  var whyTargetDistance = 0;
  var whyRenderedDistance = 0;
  var whyRenderState = { distance: 0 };
  var whyRenderTween = null;
  var whyProgress = 0;
  var whySignalRuns = [];
  var whySignalLength = 0;
  var whyInputEnabled = false;
  var whyReturning = false;
  var ctaJourney = null;
  var ctaJourneyPath = null;
  var ctaPathLength = 0;
  var ctaTargetDistance = 0;
  var ctaRenderedDistance = 0;
  var ctaRenderState = { distance: 0 };
  var ctaRenderTween = null;
  var ctaProgress = 0;
  var ctaSignalRuns = [];
  var ctaSignalLength = 0;
  var ctaInputEnabled = false;
  var ctaReturning = false;
  var touchY = null;

  function desktopAllowed() {
    return (
      window.innerWidth > 820 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function routeClass(route) {
    if (route === "dataCenter") return "route-data-center";
    if (route === "it") return "route-it";
    return "route-av";
  }

  function setControlsReady(ready) {
    document.body.classList.toggle("hub-ready", ready);

    controls.forEach(function (control) {
      control.disabled = !ready;
      control.setAttribute("aria-disabled", ready ? "false" : "true");
    });
  }

  function updateHubReady() {
    setControlsReady(lastArcProgress >= 0.985 && activeRoute === "hub");
  }

  function renderHubReveals(progress) {
    function reveal(selector, from, to) {
      var value = clamp((progress - from) / (to - from), 0, 1);
      document.querySelectorAll(selector).forEach(function (element) {
        element.style.opacity = String(value);
        element.style.transform = "translateY(" + (10 * (1 - value)) + "px)";
      });
    }
    reveal(".divisions-kicker", 0.905, 0.925);
    reveal(".divisions-headline", 0.915, 0.940);
    reveal(".divisions-support", 0.930, 0.950);
    reveal('.division-lane[data-route-target="av"]', 0.966, 0.994);
    reveal('.division-lane[data-route-target="it"]', 0.970, 0.997);
    reveal('.division-lane[data-route-target="dataCenter"]', 0.974, 1.000);
  }

  function preventScroll(event) {
    event.preventDefault();
  }

  function preventScrollKeys(event) {
    var keys = [
      "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
      "PageUp", "PageDown", "Home", "End", " "
    ];

    if (keys.indexOf(event.key) !== -1) {
      event.preventDefault();
    }
  }

  function lockScroll() {
    savedScrollY = window.scrollY;
    savedOverflow = {
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, { passive: false });
  }

  function unlockScroll() {
    document.documentElement.style.overflow = savedOverflow.html;
    document.body.style.overflow = savedOverflow.body;
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("keydown", preventScrollKeys);
  }

  function bindRouteSignals() {
    Object.keys(DATA.routeSignals).forEach(function (route) {
      if (route === "retractDuration" || route === "ease") return;

      var signal = DATA.routeSignals[route];
      var paths = Array.prototype.slice.call(
        document.querySelectorAll(
          '[data-route-signal="' + signal.key + '"] path'
        )
      );

      routeRuns[route] = paths.map(function (path) {
        var length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        return { element: path, length: length };
      });
    });
  }

  function animateSignal(route, reveal) {
    var runs = routeRuns[route] || [];
    var signal = DATA.routeSignals[route];

    if (signalTween) signalTween.kill();

    signalTween = window.gsap.to(
      runs.map(function (run) { return run.element; }),
      {
        strokeDashoffset: function (index) {
          return reveal ? 0 : runs[index].length;
        },
        duration: reveal
          ? signal.revealDuration
          : DATA.routeSignals.retractDuration,
        ease: DATA.routeSignals.ease,
        onComplete: function () { signalTween = null; }
      }
    );
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function dcProgress() {
    return (dcTargetY - dcJourney.cameraStart.y) /
      (dcJourney.cameraEnd.y - dcJourney.cameraStart.y);
  }

  function renderDcSignals(progress) {
    document.querySelectorAll(".dc-service").forEach(function (service, index) {
      service.classList.toggle("is-active", progress >= Math.max(0, index / 6 - 0.06));
    });
    dcRuns.forEach(function (group) {
      var range = group.definition.window.to - group.definition.window.from;
      var reveal = clamp(
        (progress - group.definition.window.from) / range,
        0,
        1
      );

      group.runs.forEach(function (run) {
        run.element.style.strokeDashoffset = String(run.length * (1 - reveal));
      });
    });
  }

  function bindDcSignals() {
    dcJourney = DATA.branchJourneys && DATA.branchJourneys.dataCenter;
    if (!dcJourney) return;

    dcRuns = dcJourney.signals.map(function (definition) {
      var paths = Array.prototype.slice.call(
        document.querySelectorAll('[data-dc-signal="' + definition.key + '"] path')
      );
      return {
        definition: definition,
        runs: paths.map(function (path) {
          var length = path.getTotalLength();
          path.style.strokeDasharray = String(length);
          path.style.strokeDashoffset = String(length);
          return { element: path, length: length };
        })
      };
    });
  }

  function itProgress() {
    return (itTargetY - itJourney.cameraStart.y) /
      (itJourney.cameraEnd.y - itJourney.cameraStart.y);
  }

  function renderItSignals(progress) {
    document.querySelectorAll(".it-service").forEach(function (service, index) {
      service.classList.toggle("is-active", progress >= Math.max(0, index / 6 - 0.06));
    });
    itRuns.forEach(function (group) {
      var range = group.definition.window.to - group.definition.window.from;
      var reveal = clamp((progress - group.definition.window.from) / range, 0, 1);
      group.runs.forEach(function (run) {
        run.element.style.strokeDashoffset = String(run.length * (1 - reveal));
      });
    });
  }

  function bindItSignals() {
    itJourney = DATA.branchJourneys && DATA.branchJourneys.it;
    if (!itJourney) return;
    itRuns = itJourney.signals.map(function (definition) {
      var paths = Array.prototype.slice.call(
        document.querySelectorAll('[data-it-signal="' + definition.key + '"] path')
      );
      return {
        definition: definition,
        runs: paths.map(function (path) {
          var length = path.getTotalLength();
          path.style.strokeDasharray = String(length);
          path.style.strokeDashoffset = String(length);
          return { element: path, length: length };
        })
      };
    });
  }

  /*
   * Resting camera for the AV intro composition.
   *
   * Deliberately separate from cameraStart: cameraStart remains the
   * progress origin for the six downstream AV service reveal windows,
   * so lowering the intro camera does not reshift the service tower.
   */
  function avIntroStop() {
    return (avJourney && avJourney.introStop) || avJourney.cameraStart;
  }

  function avProgress() {
    return (avTargetY - avJourney.cameraStart.y) /
      (avJourney.cameraEnd.y - avJourney.cameraStart.y);
  }

  function avVisualProgress() {
    return clamp(
      (avVisualY - avJourney.cameraStart.y) /
        (avJourney.cameraEnd.y - avJourney.cameraStart.y),
      0,
      1
    );
  }

  function avSignalPathProgress(y) {
    if (y <= avSignalAnchors[0].y) return 0;
    for (var index = 1; index < avSignalAnchors.length; index += 1) {
      var upper = avSignalAnchors[index];
      if (y <= upper.y) {
        var lower = avSignalAnchors[index - 1];
        var localProgress = (y - lower.y) / (upper.y - lower.y);
        return clamp(
          lower.p + (upper.p - lower.p) * localProgress,
          0,
          1
        );
      }
    }
    return 1;
  }

  function renderAvSignals(progress) {
    var contentReveals = (avJourney && avJourney.contentReveals) || [];
    contentReveals.forEach(function (definition) {
      var content = document.querySelector(
        '[data-av-content="' + definition.key + '"]'
      );
      if (content) {
        content.classList.toggle("is-active", progress >= definition.from);
      }
    });
    var signalProgress = avSignalPathProgress(avVisualY);
    avRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(
        run.length * (1 - signalProgress)
      );
    });
  }

  function bindAvSignals() {
    avJourney = DATA.branchJourneys && DATA.branchJourneys.av;
    if (!avJourney) return;
    avRuns = Array.prototype.slice.call(
      document.querySelectorAll('[data-av-signal="continuous"] path')
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
  }

  function createSampledPath(d) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
    document.body.appendChild(svg);
    return { element: path, length: path.getTotalLength() };
  }

  function measurePathLength(d) {
    var sampled = createSampledPath(d);
    var length = sampled.length;
    sampled.element.parentNode.remove();
    return length;
  }

  /*
   * Authored How-entry -> Qualification transition helpers.
   *
   * The camera is eased with power3.inOut; the content crossfade is driven by
   * the raw linear time of the same 1.05s move.
   */
  function easePower3InOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function fadeWindow(t, from, to) {
    if (to <= from) return t >= to ? 1 : 0;
    return clamp((t - from) / (to - from), 0, 1);
  }

  function wheelPixels(event) {
    if (event.deltaMode === 1) return event.deltaY * 16;
    if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
    return event.deltaY;
  }

  function bindHowTransitionElements() {
    howEntryElement = document.querySelector(".how-entry");
    howWorkElement = document.querySelector(".how-work");
    howWorkGroundElements = Array.prototype.slice.call(
      document.querySelectorAll(
        ".how-work-ground,.how-work-grid,.how-ground-transition"
      )
    );
    howWorkStageElements = Array.prototype.slice.call(
      document.querySelectorAll(".how-stage,.readiness-gate")
    );
  }

  function applyHowTransitionOpacity(entry, ground, stages) {
    if (howEntryElement) howEntryElement.style.opacity = String(entry);
    if (howWorkElement) howWorkElement.style.opacity = "1";
    howWorkGroundElements.forEach(function (element) {
      element.style.opacity = String(ground);
    });
    howWorkStageElements.forEach(function (element) {
      element.style.opacity = String(stages);
    });
  }

  function clearHowTransitionOpacity() {
    if (howEntryElement) howEntryElement.style.opacity = "";
    if (howWorkElement) howWorkElement.style.opacity = "";
    howWorkGroundElements.forEach(function (element) {
      element.style.opacity = "";
    });
    howWorkStageElements.forEach(function (element) {
      element.style.opacity = "";
    });
  }

  function distanceAtPoint(sampled, target) {
    var best = 0;
    var bestSquared = Infinity;
    var steps = 1200;
    var index;
    var point;
    var dx;
    var dy;
    var squared;
    var distance;
    for (index = 0; index <= steps; index += 1) {
      distance = (sampled.length * index) / steps;
      point = sampled.element.getPointAtLength(distance);
      dx = point.x - target.x;
      dy = point.y - target.y;
      squared = dx * dx + dy * dy;
      if (squared < bestSquared) {
        bestSquared = squared;
        best = distance;
      }
    }
    var span = sampled.length / steps;
    var low = Math.max(0, best - span);
    var high = Math.min(sampled.length, best + span);
    for (index = 0; index <= 200; index += 1) {
      distance = low + ((high - low) * index) / 200;
      point = sampled.element.getPointAtLength(distance);
      dx = point.x - target.x;
      dy = point.y - target.y;
      squared = dx * dx + dy * dy;
      if (squared < bestSquared) {
        bestSquared = squared;
        best = distance;
      }
    }
    return best;
  }

  function howCameraStop(key) {
    var stops = (howJourney && howJourney.cameraStops) || [];
    for (var index = 0; index < stops.length; index += 1) {
      if (stops[index].key === key) return stops[index];
    }
    return null;
  }

  function bindHowEntry() {
    if (!DATA.howEntry) return;
    Object.keys(DATA.howEntry.sources).forEach(function (source) {
      var definition = DATA.howEntry.sources[source];
      howPaths[source] = createSampledPath(definition.cameraPath);
      howSignalRuns[source] = Array.prototype.slice.call(
        document.querySelectorAll('[data-how-entry-signal="' + definition.key + '"] path')
      ).map(function (path) {
        var length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        return { element: path, length: length };
      });
    });
    howTrunkRuns = Array.prototype.slice.call(
      document.querySelectorAll('[data-how-entry-signal="' + DATA.howEntry.trunk.key + '"] path')
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
  }

  function renderHowJourney(progress) {
    howProgress = clamp(progress, 0, 1);
    var revealDistance = getHowSignalRevealDistance(howProgress);
    howContinuousRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length - revealDistance);
    });
    var gateProgress = clamp((howProgress - 0.36) / 0.12, 0, 1);
    var leftRail = document.querySelector(".readiness-gate .gate-left");
    var rightRail = document.querySelector(".readiness-gate .gate-right");
    if (leftRail) leftRail.style.transform = "translateX(" + (-gateProgress) + "rem)";
    if (rightRail) rightRail.style.transform = "translateX(" + gateProgress + "rem)";
  }

  function getHowSignalRevealDistance(progress) {
    var definition = howJourney.continuousSignal;
    var anchors = definition.distanceAnchors;
    var p = clamp(progress, 0, 1);
    if (!anchors || !anchors.length || p <= anchors[0].progress) return 0;

    for (var index = 1; index < anchors.length; index += 1) {
      var lower = anchors[index - 1];
      var upper = anchors[index];
      if (p <= upper.progress) {
        var normalized = clamp(
          (p - lower.progress) / (upper.progress - lower.progress),
          0,
          1
        );
        var fraction = lower.fraction + (upper.fraction - lower.fraction) * normalized;
        return howContinuousSignalLength * fraction;
      }
    }

    return howContinuousSignalLength;
  }

  function killHowRenderTween() {
    if (howRenderTween) {
      howRenderTween.kill();
      howRenderTween = null;
    }
  }

  function renderHowDistance() {
    var runtime = window.SPACES_RUNTIME;
    howRenderedDistance = clamp(howRenderState.distance, 0, howPathLength);
    howRenderState.distance = howRenderedDistance;
    renderHowJourney(
      howPathLength === 0 ? 0 : howRenderedDistance / howPathLength
    );
    runtime.moveCameraTo(
      howJourneyPath.element.getPointAtLength(howRenderedDistance),
      0,
      "none"
    );
  }

  function tweenHowRenderedDistance() {
    killHowRenderTween();
    howRenderTween = window.gsap.to(howRenderState, {
      distance: howTargetDistance,
      duration: 0.34,
      ease: "power2.out",
      overwrite: true,
      onUpdate: renderHowDistance,
      onComplete: function () {
        howRenderTween = null;
        renderHowDistance();
      }
    });
  }

  function renderWhyJourney(progress) {
    whyProgress = clamp(progress, 0, 1);
    var revealDistance = 0;
    if (whyProgress >= 0.98) {
      revealDistance = whySignalLength;
    } else if (whyProgress > 0.02) {
      var q = (whyProgress - 0.02) / 0.96;
      q = clamp(q, 0, 1);
      q = q * q * (3 - 2 * q);
      revealDistance = whySignalLength * q;
    }
    whySignalRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length - revealDistance);
    });
  }

  function killWhyRenderTween() {
    if (whyRenderTween) {
      whyRenderTween.kill();
      whyRenderTween = null;
    }
  }

  function renderWhyDistance() {
    var runtime = window.SPACES_RUNTIME;
    whyRenderedDistance = clamp(whyRenderState.distance, 0, whyPathLength);
    whyRenderState.distance = whyRenderedDistance;
    renderWhyJourney(
      whyPathLength === 0 ? 0 : whyRenderedDistance / whyPathLength
    );
    runtime.moveCameraTo(
      whyJourneyPath.element.getPointAtLength(whyRenderedDistance),
      0,
      "none"
    );
  }

  function tweenWhyRenderedDistance() {
    killWhyRenderTween();
    whyRenderTween = window.gsap.to(whyRenderState, {
      distance: whyTargetDistance,
      duration: 0.34,
      ease: "power2.out",
      overwrite: true,
      onUpdate: renderWhyDistance,
      onComplete: function () {
        whyRenderTween = null;
        renderWhyDistance();
      }
    });
  }

  function renderCtaJourney(progress) {
    ctaProgress = clamp(progress, 0, 1);
    var revealDistance = 0;
    if (ctaProgress >= 0.62) {
      revealDistance = ctaSignalLength;
    } else if (ctaProgress > 0.08) {
      var q = (ctaProgress - 0.08) / 0.54;
      q = clamp(q, 0, 1);
      q = q * q * (3 - 2 * q);
      revealDistance = ctaSignalLength * q;
    }
    ctaSignalRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length - revealDistance);
    });
  }

  function killCtaRenderTween() {
    if (ctaRenderTween) {
      ctaRenderTween.kill();
      ctaRenderTween = null;
    }
  }

  function renderCtaDistance() {
    var runtime = window.SPACES_RUNTIME;
    ctaRenderedDistance = clamp(ctaRenderState.distance, 0, ctaPathLength);
    ctaRenderState.distance = ctaRenderedDistance;
    renderCtaJourney(
      ctaPathLength === 0 ? 0 : ctaRenderedDistance / ctaPathLength
    );
    runtime.moveCameraTo(
      ctaJourneyPath.element.getPointAtLength(ctaRenderedDistance),
      0,
      "none"
    );
  }

  function tweenCtaRenderedDistance() {
    killCtaRenderTween();
    ctaRenderTween = window.gsap.to(ctaRenderState, {
      distance: ctaTargetDistance,
      duration: 0.34,
      ease: "power2.out",
      overwrite: true,
      onUpdate: renderCtaDistance,
      onComplete: function () {
        ctaRenderTween = null;
        renderCtaDistance();
      }
    });
  }

  function bindHowJourney() {
    howJourney = DATA.branchJourneys && DATA.branchJourneys.howWork;
    if (!howJourney) return;
    howJourneyPath = createSampledPath(howJourney.cameraPath);
    howPathLength = howJourneyPath.length;
    howContinuousRuns = Array.prototype.slice.call(
      document.querySelectorAll(
        '[data-how-signal="' + howJourney.continuousSignal.key + '"] path'
      )
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
    howContinuousSignalLength = howContinuousRuns.length
      ? howContinuousRuns[0].length
      : 0;
    var qualification = howCameraStop("qualification");
    howQualDistance = qualification
      ? distanceAtPoint(howJourneyPath, qualification)
      : 0;
    renderHowJourney(0);
  }

  function bindWhyJourney() {
    whyJourney = DATA.branchJourneys && DATA.branchJourneys.whySpaces;
    if (!whyJourney) return;
    whyJourneyPath = createSampledPath(whyJourney.cameraPath);
    whyPathLength = whyJourneyPath.length;
    whySignalRuns = Array.prototype.slice.call(
      document.querySelectorAll(
        '[data-why-signal="' + whyJourney.signal.key + '"] path'
      )
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
    whySignalLength = whySignalRuns.length ? whySignalRuns[0].length : 0;
    renderWhyJourney(0);
  }

  function bindCtaJourney() {
    ctaJourney = DATA.branchJourneys && DATA.branchJourneys.finalCta;
    if (!ctaJourney) return;
    ctaJourneyPath = createSampledPath(ctaJourney.cameraPath);
    ctaPathLength = ctaJourneyPath.length;
    ctaSignalRuns = Array.prototype.slice.call(
      document.querySelectorAll(
        '[data-cta-signal="' + ctaJourney.signal.key + '"] path'
      )
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
    ctaSignalLength = ctaSignalRuns.length ? ctaSignalRuns[0].length : 0;
    renderCtaJourney(0);
  }

  function tweenRuns(runs, reveal, duration, onComplete) {
    window.gsap.to(runs.map(function (run) { return run.element; }), {
      strokeDashoffset: function (index) { return reveal ? 0 : runs[index].length; },
      duration: duration,
      ease: DATA.howEntry.signalEase,
      overwrite: true,
      onComplete: onComplete
    });
  }

  function tweenSampledCamera(source, reverse, onComplete) {
    var runtime = window.SPACES_RUNTIME;
    var definition = DATA.howEntry.sources[source];
    var sampled = howPaths[source];
    var state = { distance: reverse ? sampled.length : 0 };
    window.gsap.to(state, {
      distance: reverse ? 0 : sampled.length,
      duration: definition.cameraDuration,
      ease: DATA.howEntry.cameraEase,
      onUpdate: function () {
        runtime.moveCameraTo(sampled.element.getPointAtLength(state.distance), 0, "none");
      },
      onComplete: onComplete
    });
  }

  function enterHowEntry(source) {
    if (howReturning || activeRoute === "howEntry") return;
    var definition = DATA.howEntry.sources[source];
    var cameraDone = false;
    var signalDone = false;
    howSource = source;
    howInputEnabled = false;
    howEntryWheelAccum = 0;
    howWorkBackAccum = 0;
    if (source === "dataCenter") dcInputEnabled = false;
    else if (source === "it") itInputEnabled = false;
    else {
      avInputEnabled = false;
      avTargetY = avJourney.cameraEnd.y;
      avVisualState.y = avVisualY;
      window.gsap.to(avVisualState, {
        y: avTargetY,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
        onUpdate: function () {
          avVisualY = avVisualState.y;
          renderAvSignals(avVisualProgress());
        },
        onComplete: function () {
          avVisualY = avTargetY;
          renderAvSignals(1);
        }
      });
    }
    activeRoute = "howEntry";
    document.body.classList.remove("route-data-center", "route-it", "route-av");
    document.body.classList.add(
      "route-how-entry",
      source === "dataCenter" ? "how-source-dc" : source === "it" ? "how-source-it" : "how-source-av"
    );

    function finishArrival() {
      if (!cameraDone || !signalDone) return;
      howInputEnabled = true;
      var back = document.querySelector("[data-how-back-fixed]");
      if (back) back.focus({ preventScroll: true });
    }

    tweenRuns(howSignalRuns[source], true, definition.revealDuration, function () {
      tweenRuns(howTrunkRuns, true, DATA.howEntry.trunk.revealDuration, function () {
        signalDone = true;
        finishArrival();
      });
    });
    tweenSampledCamera(source, false, function () {
      cameraDone = true;
      finishArrival();
    });
  }

  function restoreBranchAtEnd(source) {
    activeRoute = source;
    document.body.classList.remove("route-how-entry", "how-source-dc", "how-source-it", "how-source-av");
    document.body.classList.add(routeClass(source));
    if (source === "dataCenter") {
      dcTargetY = dcJourney.cameraEnd.y;
      renderDcSignals(1);
      dcInputEnabled = true;
    } else if (source === "it") {
      itTargetY = itJourney.cameraEnd.y;
      renderItSignals(1);
      itInputEnabled = true;
    } else {
      avTargetY = avJourney.cameraEnd.y;
      avVisualY = avTargetY;
      avVisualState.y = avVisualY;
      renderAvSignals(1);
      avInputEnabled = true;
    }
    howReturning = false;
    if (howBackToHub) {
      howBackToHub = false;
      returnToHub();
    }
  }

  function leaveHowEntry(returnToDivisions) {
    if (!howInputEnabled || howReturning || !howSource) return;
    var source = howSource;
    var definition = DATA.howEntry.sources[source];
    howInputEnabled = false;
    howReturning = true;
    howBackToHub = !!returnToDivisions;
    tweenRuns(howTrunkRuns, false, DATA.howEntry.trunk.revealDuration, function () {
      tweenRuns(howSignalRuns[source], false, definition.revealDuration, function () {
        tweenSampledCamera(source, true, function () {
          restoreBranchAtEnd(source);
        });
      });
    });
  }

  /*
   * STATE A (1160,4840) -> STATE B (1160,5290) as ONE authored move.
   *
   * There is no interactive stop between the two positions: the ground swap,
   * the header theme and the signal all resolve inside this single 1.05s
   * traversal of the existing How camera path.
   */
  function startHowEntryTransition() {
    if (!howInputEnabled || howReturning || howTransitioning) return;
    if (!howJourneyPath || howQualDistance <= 0) return;
    howInputEnabled = false;
    howWorkInputEnabled = false;
    howWorkReturning = false;
    howTransitioning = true;
    howEntryWheelAccum = 0;
    howWorkBackAccum = 0;
    killHowRenderTween();
    howTargetDistance = 0;
    howRenderedDistance = 0;
    howRenderState.distance = 0;
    renderHowJourney(0);
    activeRoute = "howWork";
    document.body.classList.remove("route-how-entry");
    document.body.classList.add("route-how-work", "how-entry-transition");
    applyHowTransitionOpacity(1, 0, 0);

    var state = { t: 0 };
    if (howEntryTransitionTween) howEntryTransitionTween.kill();
    howEntryTransitionTween = window.gsap.to(state, {
      t: 1,
      duration: HOW_TRANSITION_DURATION,
      ease: "none",
      overwrite: true,
      onUpdate: function () {
        var t = clamp(state.t, 0, 1);
        howRenderState.distance = howQualDistance * easePower3InOut(t);
        renderHowDistance();
        applyHowTransitionOpacity(
          1 - fadeWindow(t, 0.12, 0.48),
          fadeWindow(t, 0.22, 0.62),
          fadeWindow(t, 0.38, 0.74)
        );
      },
      onComplete: function () {
        howEntryTransitionTween = null;
        howRenderState.distance = howQualDistance;
        howTargetDistance = howQualDistance;
        renderHowDistance();
        clearHowTransitionOpacity();
        document.body.classList.remove("how-entry-transition");
        howTransitioning = false;
        howEntryWheelAccum = 0;
        howWorkBackAccum = 0;
        howWorkInputEnabled = true;
        howWorkReturning = false;
        activeRoute = "howWork";
      }
    });
  }

  /*
   * STATE B -> STATE A as ONE authored reverse move.
   */
  function startHowWorkReverseTransition() {
    if (howTransitioning || howWorkReturning || !howJourneyPath) return;
    howWorkInputEnabled = false;
    howTransitioning = true;
    howEntryWheelAccum = 0;
    howWorkBackAccum = 0;
    killHowRenderTween();
    var startDistance = howRenderedDistance;
    document.body.classList.remove("route-how-work");
    document.body.classList.add("route-how-entry", "how-entry-transition");
    applyHowTransitionOpacity(0, 1, 1);

    var state = { t: 0 };
    if (howEntryTransitionTween) howEntryTransitionTween.kill();
    howEntryTransitionTween = window.gsap.to(state, {
      t: 1,
      duration: HOW_TRANSITION_DURATION,
      ease: "none",
      overwrite: true,
      onUpdate: function () {
        var t = clamp(state.t, 0, 1);
        howRenderState.distance = startDistance * (1 - easePower3InOut(t));
        renderHowDistance();
        var leaving = 1 - fadeWindow(t, 0.10, 0.46);
        applyHowTransitionOpacity(fadeWindow(t, 0.30, 0.72), leaving, leaving);
      },
      onComplete: function () {
        howEntryTransitionTween = null;
        howRenderState.distance = 0;
        renderHowDistance();
        document.body.classList.remove("how-entry-transition");
        howTransitioning = false;
        restoreHowEntry();
      }
    });
  }

  function restoreHowEntry() {
    killHowRenderTween();
    clearHowTransitionOpacity();
    document.body.classList.remove("how-entry-transition");
    howTransitioning = false;
    howTargetDistance = 0;
    howRenderedDistance = 0;
    howRenderState.distance = 0;
    renderHowJourney(0);
    howWorkInputEnabled = false;
    howWorkReturning = false;
    howEntryWheelAccum = 0;
    howWorkBackAccum = 0;
    howInputEnabled = true;
    activeRoute = "howEntry";
    document.body.classList.remove("route-how-work");
    document.body.classList.add("route-how-entry");
  }

  function moveHowJourney(deltaPixels) {
    var runtime = window.SPACES_RUNTIME;
    if (howTransitioning) return;
    if (!howWorkInputEnabled || howWorkReturning || !runtime || !howJourneyPath) return;
    if (howProgress >= 0.999 && deltaPixels > 12) {
      activateWhyJourney();
      return;
    }
    if (deltaPixels >= 0) howWorkBackAccum = 0;
    if (
      howTargetDistance <= howQualDistance + 0.5 &&
      howRenderedDistance <= howQualDistance + 0.5 &&
      deltaPixels < 0
    ) {
      howWorkBackAccum += -deltaPixels;
      if (howWorkBackAccum >= HOW_TRANSITION_THRESHOLD) {
        startHowWorkReverseTransition();
      }
      return;
    }
    if (howTargetDistance >= howPathLength && deltaPixels > 0) return;
    var nextTargetDistance = clamp(
      howTargetDistance + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      howQualDistance,
      howPathLength
    );
    if (nextTargetDistance === howTargetDistance) return;
    howTargetDistance = nextTargetDistance;
    tweenHowRenderedDistance();
  }

  function activateWhyJourney() {
    if (!howWorkInputEnabled || howWorkReturning || !whyJourneyPath) return;
    killHowRenderTween();
    howTargetDistance = howPathLength;
    howRenderedDistance = howPathLength;
    howRenderState.distance = howPathLength;
    renderHowJourney(1);
    howWorkInputEnabled = false;
    killWhyRenderTween();
    whyTargetDistance = 0;
    whyRenderedDistance = 0;
    whyRenderState.distance = 0;
    renderWhyJourney(0);
    whyInputEnabled = true;
    whyReturning = false;
    activeRoute = "whySpaces";
    document.body.classList.remove("route-how-work");
    document.body.classList.add("route-why-spaces");
  }

  function restoreHowHandover() {
    var runtime = window.SPACES_RUNTIME;
    killWhyRenderTween();
    whyTargetDistance = 0;
    whyRenderedDistance = 0;
    whyRenderState.distance = 0;
    whyProgress = 0;
    renderWhyJourney(0);
    whyInputEnabled = false;
    whyReturning = false;
    howTargetDistance = howPathLength;
    howRenderedDistance = howPathLength;
    howRenderState.distance = howPathLength;
    renderHowJourney(1);
    howWorkInputEnabled = true;
    howWorkReturning = false;
    activeRoute = "howWork";
    document.body.classList.remove("route-why-spaces");
    document.body.classList.add("route-how-work");
    runtime.moveCameraTo(whyJourney.cameraStart, 0, "none");
  }

  function moveWhyJourney(deltaPixels) {
    var runtime = window.SPACES_RUNTIME;
    if (!whyInputEnabled || whyReturning || !runtime || !whyJourneyPath) return;
    if (whyProgress >= 0.999 && deltaPixels > 12) {
      activateFinalCtaJourney();
      return;
    }
    if (
      whyTargetDistance <= 0 &&
      whyRenderedDistance <= 0.5 &&
      deltaPixels < -12
    ) {
      restoreHowHandover();
      return;
    }
    if (whyTargetDistance >= whyPathLength && deltaPixels > 0) return;
    var nextTargetDistance = clamp(
      whyTargetDistance + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      0,
      whyPathLength
    );
    if (nextTargetDistance === whyTargetDistance) return;
    whyTargetDistance = nextTargetDistance;
    tweenWhyRenderedDistance();
  }

  function activateFinalCtaJourney() {
    if (!whyInputEnabled || whyReturning || !ctaJourneyPath) return;
    killWhyRenderTween();
    whyTargetDistance = whyPathLength;
    whyRenderedDistance = whyPathLength;
    whyRenderState.distance = whyPathLength;
    renderWhyJourney(1);
    whyInputEnabled = false;
    killCtaRenderTween();
    ctaTargetDistance = 0;
    ctaRenderedDistance = 0;
    ctaRenderState.distance = 0;
    renderCtaJourney(0);
    ctaInputEnabled = true;
    ctaReturning = false;
    activeRoute = "finalCta";
    document.body.classList.remove("route-why-spaces");
    document.body.classList.add("route-final-cta");
  }

  function restoreWhyExit() {
    var runtime = window.SPACES_RUNTIME;
    killCtaRenderTween();
    ctaTargetDistance = 0;
    ctaRenderedDistance = 0;
    ctaRenderState.distance = 0;
    ctaProgress = 0;
    renderCtaJourney(0);
    ctaInputEnabled = false;
    ctaReturning = false;
    whyTargetDistance = whyPathLength;
    whyRenderedDistance = whyPathLength;
    whyRenderState.distance = whyPathLength;
    renderWhyJourney(1);
    whyInputEnabled = true;
    whyReturning = false;
    activeRoute = "whySpaces";
    document.body.classList.remove("route-final-cta");
    document.body.classList.add("route-why-spaces");
    runtime.moveCameraTo(ctaJourney.cameraStart, 0, "none");
  }

  function moveCtaJourney(deltaPixels) {
    var runtime = window.SPACES_RUNTIME;
    if (!ctaInputEnabled || ctaReturning || !runtime || !ctaJourneyPath) return;
    if (
      ctaTargetDistance <= 0 &&
      ctaRenderedDistance <= 0.5 &&
      deltaPixels < -12
    ) {
      restoreWhyExit();
      return;
    }
    if (ctaTargetDistance >= ctaPathLength && deltaPixels > 0) return;
    var nextTargetDistance = clamp(
      ctaTargetDistance + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      0,
      ctaPathLength
    );
    if (nextTargetDistance === ctaTargetDistance) return;
    ctaTargetDistance = nextTargetDistance;
    tweenCtaRenderedDistance();
  }

  function rewindCtaJourneyToWhy(onComplete) {
    var runtime = window.SPACES_RUNTIME;
    killCtaRenderTween();
    ctaTargetDistance = ctaRenderedDistance;
    ctaRenderState.distance = ctaRenderedDistance;
    var state = { distance: ctaRenderedDistance };
    var duration = 0.40 + ctaProgress * 0.45;
    ctaInputEnabled = false;
    ctaReturning = true;
    window.gsap.to(state, {
      distance: 0,
      duration: duration,
      ease: "power3.inOut",
      onUpdate: function () {
        ctaTargetDistance = state.distance;
        ctaRenderedDistance = state.distance;
        ctaRenderState.distance = state.distance;
        renderCtaJourney(ctaRenderedDistance / ctaPathLength);
        runtime.moveCameraTo(
          ctaJourneyPath.element.getPointAtLength(ctaRenderedDistance),
          0,
          "none"
        );
      },
      onComplete: function () {
        restoreWhyExit();
        if (onComplete) onComplete();
      }
    });
  }

  function rewindWhyJourneyToHandover(onComplete) {
    var runtime = window.SPACES_RUNTIME;
    killWhyRenderTween();
    whyTargetDistance = whyRenderedDistance;
    whyRenderState.distance = whyRenderedDistance;
    var state = { distance: whyRenderedDistance };
    var duration = 0.45 + whyProgress * 0.55;
    whyInputEnabled = false;
    whyReturning = true;
    window.gsap.to(state, {
      distance: 0,
      duration: duration,
      ease: "power3.inOut",
      onUpdate: function () {
        whyTargetDistance = state.distance;
        whyRenderedDistance = state.distance;
        whyRenderState.distance = state.distance;
        renderWhyJourney(whyRenderedDistance / whyPathLength);
        runtime.moveCameraTo(
          whyJourneyPath.element.getPointAtLength(whyRenderedDistance),
          0,
          "none"
        );
      },
      onComplete: function () {
        restoreHowHandover();
        if (onComplete) onComplete();
      }
    });
  }

  function rewindHowJourneyToEntry(onComplete) {
    var runtime = window.SPACES_RUNTIME;
    killHowRenderTween();
    howTargetDistance = howRenderedDistance;
    howRenderState.distance = howRenderedDistance;
    var state = { distance: howRenderedDistance };
    var duration = 0.55 + howProgress * 0.75;
    var span = howRenderedDistance;
    howWorkInputEnabled = false;
    howWorkReturning = true;
    document.body.classList.add("how-entry-transition");
    applyHowTransitionOpacity(0, 1, 1);
    window.gsap.to(state, {
      distance: 0,
      duration: duration,
      ease: "power3.inOut",
      onUpdate: function () {
        howTargetDistance = state.distance;
        howRenderedDistance = state.distance;
        howRenderState.distance = state.distance;
        renderHowJourney(howRenderedDistance / howPathLength);
        runtime.moveCameraTo(
          howJourneyPath.element.getPointAtLength(howRenderedDistance),
          0,
          "none"
        );
        var t = span > 0 ? clamp(1 - state.distance / span, 0, 1) : 1;
        var leaving = 1 - fadeWindow(t, 0.10, 0.46);
        applyHowTransitionOpacity(fadeWindow(t, 0.30, 0.72), leaving, leaving);
      },
      onComplete: function () {
        restoreHowEntry();
        if (onComplete) onComplete();
      }
    });
  }

  function handleHowBack() {
    if (activeRoute === "finalCta") {
      rewindCtaJourneyToWhy(handleHowBack);
    } else if (activeRoute === "whySpaces") {
      rewindWhyJourneyToHandover(handleHowBack);
    } else if (activeRoute === "howWork") {
      rewindHowJourneyToEntry(function () { leaveHowEntry(true); });
    } else if (activeRoute === "howEntry") {
      leaveHowEntry(true);
    }
  }

  function moveDcCamera(deltaPixels, allowHowEntry) {
    var runtime = window.SPACES_RUNTIME;
    if (!dcInputEnabled || dcReturning || !runtime) return;

    if (allowHowEntry && dcProgress() >= 0.995 && deltaPixels > 12) {
      enterHowEntry("dataCenter");
      return;
    }
    dcTargetY = clamp(
      dcTargetY + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      dcJourney.cameraStart.y,
      dcJourney.cameraEnd.y
    );
    renderDcSignals(dcProgress());
    runtime.moveCameraTo({ x: 1960, y: dcTargetY }, 0.34, "power2.out");
  }

  function moveItCamera(deltaPixels, allowHowEntry) {
    var runtime = window.SPACES_RUNTIME;
    if (!itInputEnabled || itReturning || !runtime) return;
    if (allowHowEntry && itProgress() >= 0.995 && deltaPixels > 12) {
      enterHowEntry("it");
      return;
    }
    itTargetY = clamp(
      itTargetY + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      itJourney.cameraStart.y,
      itJourney.cameraEnd.y
    );
    renderItSignals(itProgress());
    runtime.moveCameraTo({ x: 1160, y: itTargetY }, 0.34, "power2.out");
  }

  function scheduleAvCameraMove() {
    if (avMoveFrame) return;
    avMoveFrame = window.requestAnimationFrame(function () {
      var runtime = window.SPACES_RUNTIME;
      var targetY = avTargetY;
      avMoveFrame = 0;
      if (!runtime || !avInputEnabled || avReturning) return;
      runtime.moveCameraTo({ x: 355, y: targetY }, 0.42, "power2.out");
      avVisualState.y = avVisualY;
      window.gsap.to(avVisualState, {
        y: targetY,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
        onUpdate: function () {
          avVisualY = avVisualState.y;
          renderAvSignals(avVisualProgress());
        }
      });
    });
  }

  function moveAvCamera(deltaPixels, allowHowEntry) {
    var runtime = window.SPACES_RUNTIME;
    if (!avInputEnabled || avReturning || !runtime) return;
    if (allowHowEntry && avProgress() >= 0.995 && deltaPixels > 12) {
      enterHowEntry("av");
      return;
    }
    deltaPixels = clamp(deltaPixels, -90, 90);
    avTargetY = clamp(
      avTargetY + (deltaPixels / runtime.getPxPerUnit()) * 0.62,
      avIntroStop().y,
      avJourney.cameraEnd.y
    );
    scheduleAvCameraMove();
  }

  function onWheel(event) {
    if (activeRoute === "hub") {
      return;
    }
    if (activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howEntry" && activeRoute !== "howWork" && activeRoute !== "whySpaces" && activeRoute !== "finalCta") return;
    event.preventDefault();
    if (howTransitioning) return;
    if (activeRoute === "dataCenter") moveDcCamera(event.deltaY, true);
    else if (activeRoute === "it") moveItCamera(event.deltaY, true);
    else if (activeRoute === "av") {
      var avDeltaPixels = event.deltaMode === 1
        ? event.deltaY * 16
        : event.deltaMode === 2
          ? event.deltaY * window.innerHeight
          : event.deltaY;
      moveAvCamera(avDeltaPixels, true);
    }
    else if (activeRoute === "howWork") moveHowJourney(event.deltaY);
    else if (activeRoute === "whySpaces") moveWhyJourney(event.deltaY);
    else if (activeRoute === "finalCta") moveCtaJourney(event.deltaY);
    else if (howInputEnabled) {
      var howPixels = wheelPixels(event);
      if (howPixels > 0) {
        howEntryWheelAccum += howPixels;
        if (howEntryWheelAccum >= HOW_TRANSITION_THRESHOLD) {
          startHowEntryTransition();
        }
      } else if (howPixels < 0) {
        howEntryWheelAccum = 0;
        if (howPixels < -12) leaveHowEntry(false);
      }
    }
  }

  function onTouchStart(event) {
    if ((activeRoute === "dataCenter" || activeRoute === "it" || activeRoute === "av" || activeRoute === "howWork" || activeRoute === "whySpaces" || activeRoute === "finalCta") && event.touches.length) {
      touchY = event.touches[0].clientY;
    }
  }

  function onTouchMove(event) {
    if ((activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howWork" && activeRoute !== "whySpaces" && activeRoute !== "finalCta") || touchY === null || !event.touches.length) return;
    event.preventDefault();
    var nextY = event.touches[0].clientY;
    if (activeRoute === "dataCenter") moveDcCamera(touchY - nextY, false);
    else if (activeRoute === "it") moveItCamera(touchY - nextY, false);
    else if (activeRoute === "av") moveAvCamera(touchY - nextY, false);
    else if (activeRoute === "howWork") moveHowJourney(touchY - nextY);
    else if (activeRoute === "whySpaces") moveWhyJourney(touchY - nextY);
    else moveCtaJourney(touchY - nextY);
    touchY = nextY;
  }

  function onTouchEnd() {
    touchY = null;
  }

  function activateRoute(route) {
    var runtime = window.SPACES_RUNTIME;
    var definition = DATA.routes[route];

    if (
      activeRoute !== "hub" ||
      lastArcProgress < 0.985 ||
      !runtime ||
      runtime.isCameraOverrideActive()
    ) return;

    activeRoute = route;
    lockScroll();
    document.body.classList.add("route-active", routeClass(route));
    setControlsReady(false);
    animateSignal(route, true);

    runtime.moveCameraTo(
      definition.target,
      definition.duration,
      definition.ease,
      function () {
        if (route === "dataCenter") {
          dcTargetY = dcJourney.cameraStart.y;
          dcInputEnabled = true;
          renderDcSignals(0);
        } else if (route === "it") {
          itTargetY = itJourney.cameraStart.y;
          itInputEnabled = true;
          renderItSignals(0);
        } else if (route === "av") {
          avTargetY = avIntroStop().y;
          avVisualY = avTargetY;
          avVisualState.y = avVisualY;
          avInputEnabled = true;
          renderAvSignals(avVisualProgress());
        }
        var back = route === "dataCenter"
          ? document.querySelector("[data-dc-back-fixed]")
          : route === "it"
            ? document.querySelector("[data-it-back-fixed]")
            : document.querySelector("[data-av-back-fixed]");
        if (back) back.focus({ preventScroll: true });
      }
    );
  }

  function completeReturnToHub(returningRoute) {
    var runtime = window.SPACES_RUNTIME;
    animateSignal(returningRoute, false);
    runtime.moveCameraTo(
      DATA.routes.hub,
      DATA.routes[returningRoute].duration,
      DATA.routes[returningRoute].ease,
      function () {
        window.scrollTo(0, savedScrollY);
        runtime.releaseCameraOverride();
        document.body.classList.remove(
          "route-active",
          "route-data-center",
          "route-it",
          "route-av",
          "route-how-entry",
          "route-how-work",
          "how-entry-transition",
          "route-why-spaces",
          "route-final-cta",
          "how-source-dc",
          "how-source-it",
          "how-source-av"
        );
        activeRoute = "hub";
        dcReturning = false;
        dcInputEnabled = false;
        itReturning = false;
        itInputEnabled = false;
        itTargetY = itJourney ? itJourney.cameraStart.y : 2030;
        if (itJourney) renderItSignals(0);
        avReturning = false;
        avInputEnabled = false;
        avTargetY = avJourney ? avIntroStop().y : 1340;
        avVisualY = avTargetY;
        avVisualState.y = avVisualY;
        if (avMoveFrame) {
          window.cancelAnimationFrame(avMoveFrame);
          avMoveFrame = 0;
        }
        if (avJourney) renderAvSignals(avVisualProgress());
        howReturning = false;
        howInputEnabled = false;
        howBackToHub = false;
        killHowRenderTween();
        howTargetDistance = 0;
        howRenderedDistance = 0;
        howRenderState.distance = 0;
        howProgress = 0;
        howWorkInputEnabled = false;
        howWorkReturning = false;
        if (howEntryTransitionTween) {
          howEntryTransitionTween.kill();
          howEntryTransitionTween = null;
        }
        howTransitioning = false;
        howEntryWheelAccum = 0;
        howWorkBackAccum = 0;
        clearHowTransitionOpacity();
        if (howJourney) renderHowJourney(0);
        killWhyRenderTween();
        whyTargetDistance = 0;
        whyRenderedDistance = 0;
        whyRenderState.distance = 0;
        whyProgress = 0;
        whyInputEnabled = false;
        whyReturning = false;
        if (whyJourney) renderWhyJourney(0);
        killCtaRenderTween();
        ctaTargetDistance = 0;
        ctaRenderedDistance = 0;
        ctaRenderState.distance = 0;
        ctaProgress = 0;
        ctaInputEnabled = false;
        ctaReturning = false;
        if (ctaJourney) renderCtaJourney(0);
        howSource = null;
        dcTargetY = dcJourney ? dcJourney.cameraStart.y : 1530;
        if (dcJourney) renderDcSignals(0);
        unlockScroll();
        updateHubReady();
        var control = document.querySelector(
          '[data-route-target="' + returningRoute + '"]'
        );
        if (control) control.focus({ preventScroll: true });
      }
    );
  }

  function returnToHub() {
    var runtime = window.SPACES_RUNTIME;
    var returningRoute = activeRoute;

    if (returningRoute === "hub" || !runtime || dcReturning || itReturning || avReturning || howReturning) return;

    if (returningRoute === "av") {
      avInputEnabled = false;
      avReturning = true;
      var avDuration = 0.55 + avProgress() * 0.65;
      if (avMoveFrame) {
        window.cancelAnimationFrame(avMoveFrame);
        avMoveFrame = 0;
      }
      avVisualState.y = avVisualY;
      window.gsap.to(avVisualState, {
        y: avIntroStop().y,
        duration: avDuration,
        ease: "power3.inOut",
        overwrite: true,
        onUpdate: function () {
          avVisualY = avVisualState.y;
          renderAvSignals(avVisualProgress());
        }
      });
      runtime.moveCameraTo(avIntroStop(), avDuration, "power3.inOut", function () {
        avTargetY = avIntroStop().y;
        avVisualY = avTargetY;
        avVisualState.y = avVisualY;
        renderAvSignals(avVisualProgress());
        completeReturnToHub(returningRoute);
      });
      return;
    }

    if (returningRoute === "it") {
      itInputEnabled = false;
      itReturning = true;
      var itDuration = 0.55 + itProgress() * 0.65;
      itRuns.forEach(function (group) {
        window.gsap.to(group.runs.map(function (run) { return run.element; }), {
          strokeDashoffset: function (index) { return group.runs[index].length; },
          duration: Math.min(0.42, itDuration),
          ease: "power2.inOut",
          overwrite: true
        });
      });
      runtime.moveCameraTo(itJourney.cameraStart, itDuration, "power3.inOut", function () {
        itTargetY = itJourney.cameraStart.y;
        completeReturnToHub(returningRoute);
      });
      return;
    }

    dcInputEnabled = false;
    dcReturning = true;
    var progress = dcProgress();
    var duration = 0.55 + progress * 0.65;

    dcRuns.forEach(function (group) {
      window.gsap.to(group.runs.map(function (run) { return run.element; }), {
        strokeDashoffset: function (index) { return group.runs[index].length; },
        duration: Math.min(0.42, duration),
        ease: "power2.inOut",
        overwrite: true
      });
    });

    runtime.moveCameraTo(
      dcJourney.cameraStart,
      duration,
      "power3.inOut",
      function () {
        dcTargetY = dcJourney.cameraStart.y;
        completeReturnToHub(returningRoute);
      }
    );
  }

  function init() {
    if (!DATA || !DATA.routes || !DATA.routeSignals || !desktopAllowed()) {
      return;
    }

    controls = Array.prototype.slice.call(
      document.querySelectorAll("[data-route-target]")
    );
    bindRouteSignals();
    bindDcSignals();
    bindItSignals();
    bindAvSignals();
    bindHowTransitionElements();
    bindHowEntry();
    bindHowJourney();
    bindWhyJourney();
    bindCtaJourney();
    setControlsReady(false);

    controls.forEach(function (control) {
      control.addEventListener("click", function () {
        activateRoute(control.getAttribute("data-route-target"));
      });
    });

    Array.prototype.slice.call(
      document.querySelectorAll("[data-route-back]")
    ).forEach(function (control) {
      control.addEventListener("click", returnToHub);
    });

    var dcBack = document.querySelector("[data-dc-back-fixed]");
    if (dcBack) dcBack.addEventListener("click", returnToHub);
    var itBack = document.querySelector("[data-it-back-fixed]");
    if (itBack) itBack.addEventListener("click", returnToHub);
    var avBack = document.querySelector("[data-av-back-fixed]");
    if (avBack) avBack.addEventListener("click", returnToHub);
    var howBack = document.querySelector("[data-how-back-fixed]");
    if (howBack) howBack.addEventListener("click", handleHowBack);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    window.addEventListener("spaces:progress", function (event) {
      lastArcProgress = event.detail.arcProgress;
      renderHubReveals(lastArcProgress);
      updateHubReady();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
