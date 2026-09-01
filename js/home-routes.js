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
  var howWorkForwardAccum = 0;
  var howStageIndex = 0;
  var howStageElements = [];
  var howStagePaths = [];
  var howStageTween = null;
  var howWheelReleaseTimer = 0;
  var howWheelAwaitingRelease = false;
  var howTouchAwaitingRelease = false;
  var howQualDistance = 0;
  var howEntryTransitionPath = null;
  var howEntryElement = null;
  var howEntryContentElements = [];
  var howWorkElement = null;
  var howWorkGroundElement = null;
  var howWorkGridElement = null;
  var howTransitionGroundElement = null;
  var howTransitionDarkElement = null;
  var howTransitionLightElement = null;
  var howQualificationElement = null;
  var howFutureStageElements = [];
  var HOW_TRANSITION_DURATION = 1.10;
  var HOW_TRANSITION_THRESHOLD = 18;
  var touchY = null;
  var downstreamJourney = null;
  var downstreamPaths = [];
  var downstreamRuns = [];
  var downstreamLength = 0;
  var downstreamIndex = -1;
  var downstreamTransitioning = false;
  var downstreamForwardAccum = 0;
  var downstreamBackAccum = 0;
  var downstreamElements = {};
  var journeyTargetDistance = 0;
  var journeyVisualDistance = 0;
  var continuousJourneyPath = null;
  var continuousJourneyLength = 0;
  var continuousAnchorDistances = [0,299.348,759.348,1238.524,1842.699,2342.699,3038.875,3418.875,3998.875,4303.875,4613.875];
  var continuousSignalFractions = [0.059730002,0.196568864,0.399119984,0.600881674,0.862369111,1];

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
    var value = clamp((t - from) / (to - from), 0, 1);
    return value * value * (3 - 2 * value);
  }

  function smoothWindow(t, from, to) {
    var value = fadeWindow(t, from, to);
    return value * value * (3 - 2 * value);
  }

  function mixColor(a, b, t) {
    function rgb(hex) { return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]; }
    var from = rgb(a), to = rgb(b);
    return "rgb(" + from.map(function (value, index) { return Math.round(value + (to[index] - value) * t); }).join(",") + ")";
  }

  function wheelPixels(event) {
    if (event.deltaMode === 1) return event.deltaY * 16;
    if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
    return event.deltaY;
  }

  function bindHowTransitionElements() {
    howEntryElement = document.querySelector(".how-entry");
    howEntryContentElements = Array.prototype.slice.call(
      document.querySelectorAll(
        ".how-entry-kicker,.how-entry h2,.how-entry-support"
      )
    );
    howWorkElement = document.querySelector(".how-work");
    howWorkGroundElement = document.querySelector(".how-work-ground");
    howWorkGridElement = document.querySelector(".how-work-grid");
    howTransitionGroundElement = document.querySelector(".how-ground-transition");
    howTransitionDarkElement = document.querySelector(".how-transition-ground-dark");
    howTransitionLightElement = document.querySelector(".how-transition-ground-light");
    howQualificationElement = document.querySelector(".how-stage-01");
    howStageElements = Array.prototype.slice.call(
      document.querySelectorAll(".how-stage")
    );
    howFutureStageElements = Array.prototype.slice.call(
      document.querySelectorAll(
        ".how-stage-02,.how-stage-03,.how-stage-04,.how-stage-05,.how-stage-06,.readiness-gate"
      )
    );
  }

  function applyHowTransitionOpacity(entry, dark, light, grid, qualification) {
    if (howEntryElement) howEntryElement.style.opacity = "1";
    howEntryContentElements.forEach(function (element) {
      element.style.opacity = String(entry);
    });
    if (howWorkElement) howWorkElement.style.opacity = "1";
    if (howWorkGroundElement) howWorkGroundElement.style.opacity = "1";
    if (howTransitionGroundElement) howTransitionGroundElement.style.opacity = "1";
    if (howTransitionDarkElement) howTransitionDarkElement.style.opacity = String(dark);
    if (howTransitionLightElement) howTransitionLightElement.style.opacity = String(light);
    if (howWorkGridElement) howWorkGridElement.style.opacity = String(grid);
    if (howQualificationElement) howQualificationElement.style.opacity = String(qualification);
    howFutureStageElements.forEach(function (element) {
      element.style.opacity = "0";
    });
  }

  function clearHowTransitionOpacity() {
    if (howEntryElement) howEntryElement.style.opacity = "";
    howEntryContentElements.forEach(function (element) {
      element.style.opacity = "";
    });
    if (howWorkElement) howWorkElement.style.opacity = "";
    if (howWorkGroundElement) howWorkGroundElement.style.opacity = "";
    if (howWorkGridElement) howWorkGridElement.style.opacity = "";
    if (howTransitionGroundElement) howTransitionGroundElement.style.opacity = "";
    if (howTransitionDarkElement) howTransitionDarkElement.style.opacity = "";
    if (howTransitionLightElement) howTransitionLightElement.style.opacity = "";
    if (howQualificationElement) howQualificationElement.style.opacity = "";
    howFutureStageElements.forEach(function (element) {
      element.style.opacity = "";
    });
  }

  function mixChannel(from, to, progress) {
    return Math.round(from + (to - from) * progress);
  }

  function applyHowSignalColor(progress) {
    var colorProgress = fadeWindow(progress, 0.10, 0.30);
    var core = "rgb(" + [
      mixChannel(243, 47, colorProgress),
      mixChannel(233, 22, colorProgress),
      mixChannel(255, 80, colorProgress)
    ].join(",") + ")";
    var glow = "rgb(" + [
      mixChannel(201, 176, colorProgress),
      mixChannel(164, 131, colorProgress),
      mixChannel(255, 174, colorProgress)
    ].join(",") + ")";
    var signalRuns = howTrunkRuns.concat(howContinuousRuns);
    Object.keys(howSignalRuns).forEach(function (key) {
      signalRuns = signalRuns.concat(howSignalRuns[key]);
    });
    signalRuns.forEach(function (run) {
      if (run.element.classList.contains("sig-core")) run.element.style.stroke = core;
      else if (run.element.classList.contains("sig-glow")) run.element.style.stroke = glow;
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
  }

  function setHowSignalFraction(fraction) {
    var revealDistance = howContinuousSignalLength * fraction;
    howContinuousRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length - revealDistance);
    });
  }

  function setHowStageOpacity(index, opacity) {
    if (howStageElements[index]) {
      howStageElements[index].style.opacity = String(opacity);
    }
    if (index === 2) {
      var gate = document.querySelector(".readiness-gate");
      if (gate) gate.style.opacity = String(opacity);
    }
  }

  function settleHowStage(index) {
    howStageIndex = clamp(index, 0, 5);
    howStageElements.forEach(function (element, stageIndex) {
      element.style.opacity = stageIndex === howStageIndex ? "1" : "0.14";
    });
    var gate = document.querySelector(".readiness-gate");
    if (gate) gate.style.opacity = howStageIndex === 2 ? "1" : "0.14";
    setHowSignalFraction(howJourney.stageSignalFractions[howStageIndex]);
    howProgress = howStageIndex / 5;
  }

  function armHowWheelAfterRelease() {
    howWheelAwaitingRelease = true;
    if (howWheelReleaseTimer) window.clearTimeout(howWheelReleaseTimer);
    howWheelReleaseTimer = window.setTimeout(function () {
      howWheelReleaseTimer = 0;
      howWheelAwaitingRelease = false;
    }, 140);
  }

  function consumeHowWheelMomentum() {
    if (!howWheelAwaitingRelease) return false;
    armHowWheelAfterRelease();
    return true;
  }

  function startHowStageTransition(targetIndex) {
    if (howTransitioning || targetIndex < 0 || targetIndex > 5) return;
    var fromIndex = howStageIndex;
    var direction = targetIndex > fromIndex ? 1 : -1;
    var segmentIndex = direction > 0 ? fromIndex : targetIndex;
    var sampled = howStagePaths[segmentIndex];
    var definition = howJourney.stageTransitions[segmentIndex];
    var runtime = window.SPACES_RUNTIME;
    if (!sampled || !definition || !runtime) return;

    howTransitioning = true;
    howWorkInputEnabled = false;
    if (touchY !== null) howTouchAwaitingRelease = true;
    howWorkForwardAccum = 0;
    howWorkBackAccum = 0;
    var startFraction = howJourney.stageSignalFractions[fromIndex];
    var endFraction = howJourney.stageSignalFractions[targetIndex];
    var state = { t: 0 };
    howStageTween = window.gsap.to(state, {
      t: 1,
      duration: definition.duration,
      ease: "none",
      overwrite: true,
      onUpdate: function () {
        var t = clamp(state.t, 0, 1);
        var eased = easePower3InOut(t);
        var distanceProgress = direction > 0 ? eased : 1 - eased;
        runtime.moveCameraTo(
          sampled.element.getPointAtLength(sampled.length * distanceProgress),
          0,
          "none"
        );
        howStageElements.forEach(function (element, index) {
          if (index !== fromIndex && index !== targetIndex) element.style.opacity = "0.14";
        });
        setHowStageOpacity(fromIndex, 1 - 0.86 * fadeWindow(t, 0.10, 0.58));
        setHowStageOpacity(targetIndex, 0.14 + 0.86 * fadeWindow(t, 0.24, 0.72));
        var signalT = fadeWindow(t, 0.12, 0.88);
        setHowSignalFraction(startFraction + (endFraction - startFraction) * signalT);
      },
      onComplete: function () {
        howStageTween = null;
        runtime.moveCameraTo(howJourney.cameraStops[targetIndex + 1], 0, "none");
        settleHowStage(targetIndex);
        howTransitioning = false;
        howWorkForwardAccum = 0;
        howWorkBackAccum = 0;
        howWorkInputEnabled = true;
        armHowWheelAfterRelease();
      }
    });
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

  function bindHowJourney() {
    howJourney = DATA.branchJourneys && DATA.branchJourneys.howWork;
    if (!howJourney) return;
    howEntryTransitionPath = createSampledPath(
      howJourney.entryToQualificationPath || "M 1160 4840 V 5290"
    );
    howJourneyPath = createSampledPath(howJourney.cameraPath);
    continuousJourneyPath = createSampledPath(DATA.branchJourneys.downstream.cameraPath);
    continuousJourneyLength = continuousJourneyPath.length;
    howStagePaths = howJourney.stageTransitions.map(function (transition) {
      return createSampledPath(transition.path);
    });
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
    journeyTargetDistance = journeyVisualDistance = 0;
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
    if (howQualificationElement) howQualificationElement.style.opacity = "0";
    if (howWorkGridElement) howWorkGridElement.style.opacity = "0";

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
   * the header theme and the signal all resolve inside this single 1.10s
   * traversal of the existing How camera path.
   */
  function startHowEntryTransition() {
    if (!howInputEnabled || howReturning || howTransitioning) return;
    if (!howJourneyPath || !howEntryTransitionPath || howQualDistance <= 0) return;
    var runtime = window.SPACES_RUNTIME;
    if (!runtime) return;
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
    activeRoute = "howTransition";
    document.body.classList.add("route-how-transition");
    applyHowTransitionOpacity(1, 1, 0, 0, 0);
    applyHowSignalColor(0);

    var state = { t: 0 };
    if (howEntryTransitionTween) howEntryTransitionTween.kill();
    howEntryTransitionTween = window.gsap.to(state, {
      t: 1,
      duration: HOW_TRANSITION_DURATION,
      ease: "none",
      overwrite: true,
      onUpdate: function () {
        var t = clamp(state.t, 0, 1);
        var eased = easePower3InOut(t);
        howRenderState.distance = howQualDistance * eased;
        renderHowJourney(0);
        runtime.moveCameraTo(
          howEntryTransitionPath.element.getPointAtLength(
            howEntryTransitionPath.length * eased
          ),
          0,
          "none"
        );
        var signalReveal = fadeWindow(t, 0.24, 0.78);
        howContinuousRuns.forEach(function (run) {
          run.element.style.strokeDashoffset = String(run.length - 138 * signalReveal);
        });
        applyHowSignalColor(t);
        applyHowTransitionOpacity(
          1 - fadeWindow(t, 0.18, 0.62),
          1 - fadeWindow(t, 0.08, 0.58),
          fadeWindow(t, 0.05, 0.55),
          fadeWindow(t, 0.26, 0.64),
          fadeWindow(t, 0.38, 0.72)
        );
      },
      onComplete: function () {
        howEntryTransitionTween = null;
        howRenderState.distance = howQualDistance;
        howTargetDistance = howQualDistance;
        renderHowJourney(howQualDistance / howPathLength);
        howContinuousRuns.forEach(function (run) {
          run.element.style.strokeDashoffset = String(run.length - 138);
        });
        applyHowSignalColor(1);
        runtime.moveCameraTo({ x: 1160, y: 5290 }, 0, "none");
        clearHowTransitionOpacity();
        settleHowStage(0);
        document.body.classList.remove("route-how-entry", "route-how-transition");
        document.body.classList.add("route-how-work");
        howTransitioning = false;
        howEntryWheelAccum = 0;
        howWorkBackAccum = 0;
        howWorkInputEnabled = true;
        howWorkReturning = false;
        activeRoute = "howWork";
        if (touchY !== null) howTouchAwaitingRelease = true;
        armHowWheelAfterRelease();
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
    var runtime = window.SPACES_RUNTIME;
    document.body.classList.add("route-how-transition");
    activeRoute = "howTransition";
    applyHowTransitionOpacity(0, 0, 1, 1, 1);
    applyHowSignalColor(1);

    var state = { t: 0 };
    if (howEntryTransitionTween) howEntryTransitionTween.kill();
    howEntryTransitionTween = window.gsap.to(state, {
      t: 1,
      duration: HOW_TRANSITION_DURATION,
      ease: "none",
      overwrite: true,
      onUpdate: function () {
        var t = clamp(state.t, 0, 1);
        var forwardT = 1 - t;
        var eased = easePower3InOut(forwardT);
        howRenderState.distance = howQualDistance * eased;
        renderHowJourney(0);
        runtime.moveCameraTo(
          howEntryTransitionPath.element.getPointAtLength(
            howEntryTransitionPath.length * eased
          ),
          0,
          "none"
        );
        var signalReveal = fadeWindow(forwardT, 0.24, 0.78);
        howContinuousRuns.forEach(function (run) {
          run.element.style.strokeDashoffset = String(run.length - 138 * signalReveal);
        });
        applyHowSignalColor(forwardT);
        applyHowTransitionOpacity(
          1 - fadeWindow(forwardT, 0.18, 0.62),
          1 - fadeWindow(forwardT, 0.08, 0.58),
          fadeWindow(forwardT, 0.05, 0.55),
          fadeWindow(forwardT, 0.26, 0.64),
          fadeWindow(forwardT, 0.38, 0.72)
        );
      },
      onComplete: function () {
        howEntryTransitionTween = null;
        howRenderState.distance = 0;
        renderHowDistance();
        document.body.classList.remove("route-how-transition");
        howTransitioning = false;
        restoreHowEntry();
      }
    });
  }

  function restoreHowEntry() {
    killHowRenderTween();
    clearHowTransitionOpacity();
    if (howQualificationElement) howQualificationElement.style.opacity = "0";
    if (howWorkGridElement) howWorkGridElement.style.opacity = "0";
    document.body.classList.remove("route-how-transition");
    howTransitioning = false;
    howTargetDistance = 0;
    howRenderedDistance = 0;
    howRenderState.distance = 0;
    renderHowJourney(0);
    applyHowSignalColor(0);
    howWorkInputEnabled = false;
    howWorkReturning = false;
    howEntryWheelAccum = 0;
    howWorkBackAccum = 0;
    howInputEnabled = true;
    activeRoute = "howEntry";
    document.body.classList.remove("route-how-work");
    document.body.classList.add("route-how-entry");
  }

  function bindDownstream() {
    downstreamJourney = DATA.branchJourneys && DATA.branchJourneys.downstream;
    if (!downstreamJourney) return;
    downstreamPaths = downstreamJourney.transitions.map(function (item) { return createSampledPath(item.path); });
    downstreamRuns = Array.prototype.slice.call(document.querySelectorAll("[data-downstream-signal] path")).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
    downstreamLength = downstreamRuns.length ? downstreamRuns[0].length : 0;
    downstreamElements = {
      light: document.querySelector(".downstream-ground-light"), dark: document.querySelector(".downstream-ground-dark"),
      why: document.querySelector(".why-chapter"), grid: document.querySelector(".why-grid"), intro: document.querySelector(".why-intro"),
      proofs: document.querySelector(".why-proofs"), cta: document.querySelector(".home-cta"), footer: document.querySelector(".home-world-footer")
    };
  }

  function setDownstreamSignal(fraction) {
    downstreamRuns.forEach(function (run) { run.element.style.strokeDashoffset = String(run.length * (1 - fraction)); });
  }

  function setDownstreamColors(t) {
    var colorT = smoothWindow(t, 0.10, 0.30);
    var core = mixColor("#2f1650", "#f3e9ff", colorT);
    var glow = mixColor("#b083ae", "#c9a4ff", colorT);
    downstreamRuns.forEach(function (run) { run.element.style.stroke = run.element.classList.contains("sig-core") ? core : glow; });
    howContinuousRuns.forEach(function (run) { run.element.style.stroke = run.element.classList.contains("sig-core") ? core : glow; });
  }

  function settleDownstream(index) {
    downstreamIndex = index;
    var fractions = downstreamJourney.signal.fractions;
    setDownstreamSignal(fractions[index + 1]);
    setDownstreamColors(1);
    downstreamElements.light.style.opacity = "0"; downstreamElements.dark.style.opacity = "1";
    downstreamElements.why.style.opacity = "1"; downstreamElements.grid.style.opacity = "1";
    downstreamElements.intro.style.opacity = index === 0 ? "1" : "0.18";
    downstreamElements.proofs.style.opacity = index === 1 ? "1" : (index >= 2 ? "0.12" : "0");
    downstreamElements.cta.style.opacity = index === 2 ? "1" : (index >= 3 ? "0.18" : "0");
    downstreamElements.footer.style.opacity = index >= 3 ? "1" : "0";
    document.body.classList.add("route-downstream"); document.body.classList.remove("on-paper");
  }

  function renderDownstreamTransition(segment, forwardT) {
    var fromFraction = downstreamJourney.signal.fractions[segment];
    var toFraction = downstreamJourney.signal.fractions[segment + 1];
    var signalT = segment === 0 ? smoothWindow(forwardT, .18, .88) : segment < 3 ? smoothWindow(forwardT, .12, .88) : 1;
    setDownstreamSignal(fromFraction + (toFraction - fromFraction) * signalT);
    if (segment === 0) {
      downstreamElements.light.style.opacity = String(1 - smoothWindow(forwardT, .08, .68));
      downstreamElements.dark.style.opacity = String(smoothWindow(forwardT, .10, .70));
      downstreamElements.grid.style.opacity = String(smoothWindow(forwardT, .30, .72));
      downstreamElements.why.style.opacity = "1";
      downstreamElements.intro.style.opacity = String(smoothWindow(forwardT, .34, .76));
      setHowStageOpacity(5, 1 - .86 * smoothWindow(forwardT, .14, .58));
      setDownstreamColors(forwardT);
    } else if (segment === 1) {
      downstreamElements.intro.style.opacity = String(1 - .82 * smoothWindow(forwardT, .10, .55));
      downstreamElements.proofs.style.opacity = String(smoothWindow(forwardT, .28, .72));
    } else if (segment === 2) {
      downstreamElements.proofs.style.opacity = String(1 - .88 * smoothWindow(forwardT, .10, .58));
      downstreamElements.cta.style.opacity = String(smoothWindow(forwardT, .30, .72));
    } else if (segment === 3) {
      downstreamElements.cta.style.opacity = String(1 - .82 * smoothWindow(forwardT, .12, .60));
      downstreamElements.footer.style.opacity = String(smoothWindow(forwardT, .28, .72));
    }
  }

  function startDownstreamTransition(segment, direction) {
    if (downstreamTransitioning || !downstreamPaths[segment]) return;
    var runtime = window.SPACES_RUNTIME, sampled = downstreamPaths[segment], definition = downstreamJourney.transitions[segment];
    downstreamTransitioning = true; howTransitioning = true; howWorkInputEnabled = false;
    downstreamForwardAccum = downstreamBackAccum = 0; activeRoute = "downstream";
    document.body.classList.add("route-downstream");
    downstreamElements.why.style.opacity = "1"; downstreamRuns.forEach(function (run) { run.element.parentNode.style.opacity = "1"; });
    var state = { t: direction > 0 ? 0 : 1 };
    window.gsap.to(state, { t: direction > 0 ? 1 : 0, duration: definition.duration, ease: "none", overwrite: true,
      onUpdate: function () { var forwardT = state.t, eased = easePower3InOut(forwardT); runtime.moveCameraTo(sampled.element.getPointAtLength(sampled.length * eased), 0, "none"); renderDownstreamTransition(segment, forwardT); },
      onComplete: function () {
        downstreamTransitioning = false; howTransitioning = false; downstreamForwardAccum = downstreamBackAccum = 0;
        if (direction < 0 && segment === 0) {
          downstreamIndex = -1; activeRoute = "howWork"; document.body.classList.remove("route-downstream"); document.body.classList.add("on-paper");
          downstreamElements.why.style.opacity = "0"; downstreamElements.dark.style.opacity = "0"; downstreamElements.light.style.opacity = "1"; downstreamElements.grid.style.opacity = "0";
          setDownstreamSignal(0); setDownstreamColors(0); setHowSignalFraction(1); settleHowStage(5); howWorkInputEnabled = true;
        } else { settleDownstream(direction > 0 ? segment : segment - 1); }
        armHowWheelAfterRelease();
      }
    });
  }

  function moveDownstream(deltaPixels) {
    if (downstreamTransitioning) return;
    if (deltaPixels > 0) { downstreamBackAccum = 0; downstreamForwardAccum += deltaPixels; if (downstreamForwardAccum < HOW_TRANSITION_THRESHOLD) return; if (downstreamIndex >= 4) { downstreamForwardAccum = 0; armHowWheelAfterRelease(); return; } startDownstreamTransition(downstreamIndex + 1, 1); }
    else if (deltaPixels < 0) { downstreamForwardAccum = 0; downstreamBackAccum += -deltaPixels; if (downstreamBackAccum < HOW_TRANSITION_THRESHOLD) return; startDownstreamTransition(downstreamIndex, -1); }
  }

  function moveHowJourney(deltaPixels) {
    if (howTransitioning || !howWorkInputEnabled || !continuousJourneyPath) return;
    var runtime = window.SPACES_RUNTIME;
    var px = clamp(deltaPixels, -90, 90);
    if (px < 0 && journeyTargetDistance <= 0.001) { startHowWorkReverseTransition(); return; }
    journeyTargetDistance = clamp(journeyTargetDistance + (px / runtime.getPxPerUnit()) * 1.00, 0, continuousJourneyLength);
    if (journeyVisualTween) journeyVisualTween.kill();
    var state = { d: journeyVisualDistance };
    journeyVisualTween = window.gsap.to(state, { d: journeyTargetDistance, duration: 0.42, ease: "power2.out", overwrite: true,
      onUpdate: function () { journeyVisualDistance = state.d; renderContinuousJourney(); },
      onComplete: function () { journeyVisualDistance = state.d; renderContinuousJourney(); journeyVisualTween = null; }
    });
  }

  var journeyVisualTween = null;
  function piecewise(distance, anchors, values) {
    for (var i = 1; i < anchors.length; i += 1) if (distance <= anchors[i]) { var q = (distance - anchors[i-1]) / (anchors[i]-anchors[i-1]); return values[i-1] + (values[i]-values[i-1]) * q; }
    return values[values.length-1];
  }
  function renderContinuousJourney() {
    var runtime = window.SPACES_RUNTIME;
    runtime.moveCameraTo(continuousJourneyPath.element.getPointAtLength(journeyVisualDistance),0,"none");
    var d = journeyVisualDistance;
    if (d < continuousAnchorDistances[5]) {
      var sf = piecewise(d, continuousAnchorDistances.slice(0,6), continuousSignalFractions);
      setHowSignalFraction(sf); howStageElements.forEach(function(el,i){var a=continuousAnchorDistances[i],b=continuousAnchorDistances[i+1],s=clamp((d-a)/(b-a),0,1);el.style.opacity=String(i===0&&d<=a?1:i===0?1-.86*s:i===5&&d>=b?1:.14);});
      var idx = 0; while(idx<5 && d>continuousAnchorDistances[idx+1]) idx++; var s=clamp((d-continuousAnchorDistances[idx])/(continuousAnchorDistances[idx+1]-continuousAnchorDistances[idx]),0,1); howStageElements.forEach(function(el,i){if(i===idx)el.style.opacity=String(1-.86*s);else if(i===idx+1)el.style.opacity=String(.14+.86*s);else if(i!==idx&&i!==idx+1)el.style.opacity="0.14";});
      var gate=document.querySelector('.readiness-gate');if(gate)gate.style.opacity=String(idx===2?1:.14);
    } else {
      var ds = piecewise(d, continuousAnchorDistances.slice(5), [0,.3513513514,.6486486486,1,1,1]); setDownstreamSignal(ds); setDownstreamColors(clamp((d-continuousAnchorDistances[5])/(continuousAnchorDistances[6]-continuousAnchorDistances[5]),0,1));
      var t=clamp((d-continuousAnchorDistances[5])/(continuousAnchorDistances[6]-continuousAnchorDistances[5]),0,1); downstreamElements.light.style.opacity=String(1-smoothWindow(t,.08,.68));downstreamElements.dark.style.opacity=String(smoothWindow(t,.10,.70));downstreamElements.grid.style.opacity=String(smoothWindow(t,.30,.72));downstreamElements.why.style.opacity="1";downstreamElements.intro.style.opacity=String(1-smoothWindow(t,.34,.76));downstreamElements.proofs.style.opacity=String(smoothWindow(t,.28,.72));downstreamElements.cta.style.opacity=String(smoothWindow((d-continuousAnchorDistances[7])/(continuousAnchorDistances[8]-continuousAnchorDistances[7]),.30,.72));downstreamElements.footer.style.opacity=String(smoothWindow((d-continuousAnchorDistances[8])/(continuousAnchorDistances[10]-continuousAnchorDistances[8]),.28,.72));document.body.classList.add('route-downstream');
    }
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
    document.body.classList.add("route-how-transition");
    applyHowTransitionOpacity(0, 0, 1, 1, 1);
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
        applyHowTransitionOpacity(
          fadeWindow(t, 0.30, 0.72),
          fadeWindow(t, 0.30, 0.72),
          leaving,
          leaving,
          leaving
        );
      },
      onComplete: function () {
        restoreHowEntry();
        if (onComplete) onComplete();
      }
    });
  }

  function handleHowBack() {
    if (activeRoute === "howWork") {
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
      avTargetY + (deltaPixels / runtime.getPxPerUnit()) * 1.00,
      avIntroStop().y,
      avJourney.cameraEnd.y
    );
    scheduleAvCameraMove();
  }

  function onWheel(event) {
    if (activeRoute === "hub") {
      return;
    }
    if (activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howEntry" && activeRoute !== "howWork" && activeRoute !== "downstream") return;
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
    else if (activeRoute === "howWork") {
      var stageWheelPixels = wheelPixels(event);
      if (!consumeHowWheelMomentum()) moveHowJourney(stageWheelPixels);
    }
    else if (activeRoute === "downstream") {
      var downstreamPixels = wheelPixels(event);
      if (!consumeHowWheelMomentum()) moveDownstream(downstreamPixels);
    }
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
    if ((activeRoute === "dataCenter" || activeRoute === "it" || activeRoute === "av" || activeRoute === "howEntry" || activeRoute === "howWork" || activeRoute === "downstream") && event.touches.length) {
      touchY = event.touches[0].clientY;
    }
  }

  function onTouchMove(event) {
    if ((activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howEntry" && activeRoute !== "howWork" && activeRoute !== "downstream") || touchY === null || !event.touches.length) return;
    event.preventDefault();
    var nextY = event.touches[0].clientY;
    if (activeRoute === "dataCenter") moveDcCamera(touchY - nextY, false);
    else if (activeRoute === "it") moveItCamera(touchY - nextY, false);
    else if (activeRoute === "av") moveAvCamera(touchY - nextY, false);
    else if (activeRoute === "howEntry") {
      var howTouchPixels = touchY - nextY;
      if (howTouchPixels > 0) {
        howEntryWheelAccum += howTouchPixels;
        if (howEntryWheelAccum >= HOW_TRANSITION_THRESHOLD) startHowEntryTransition();
      } else if (howTouchPixels < 0) {
        howEntryWheelAccum = 0;
        if (howTouchPixels < -12) leaveHowEntry(false);
      }
    }
    else if (activeRoute === "howWork") {
      if (!howTouchAwaitingRelease) moveHowJourney(touchY - nextY);
    }
    else if (activeRoute === "downstream") {
      if (!howTouchAwaitingRelease) moveDownstream(touchY - nextY);
    }
    touchY = nextY;
  }

  function onTouchEnd() {
    touchY = null;
    howTouchAwaitingRelease = false;
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
          "route-how-transition",
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
        howWorkForwardAccum = 0;
        howStageIndex = 0;
        howWheelAwaitingRelease = false;
        howTouchAwaitingRelease = false;
        if (howWheelReleaseTimer) {
          window.clearTimeout(howWheelReleaseTimer);
          howWheelReleaseTimer = 0;
        }
        clearHowTransitionOpacity();
        if (howJourney) renderHowJourney(0);
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
    bindDownstream();
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
