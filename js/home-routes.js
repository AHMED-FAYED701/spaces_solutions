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
  var dcTargetY = 1340;
  var dcVisualY = 1340;
  var dcVisualState = { y: 1340 };
  var dcMoveFrame = 0;
  var dcSignalAnchors = [
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
  var dcInputEnabled = false;
  var dcReturning = false;
  var itJourney = null;
  var itRuns = [];
  var itTargetY = 1840;
  var itVisualY = 1840;
  var itVisualState = { y: 1840 };
  var itMoveFrame = 0;
  var itSignalAnchors = [
    { y: 1840, p: 0.0000000000 },
    { y: 2210, p: 0.0508562694 },
    { y: 2300, p: 0.0661131503 },
    { y: 2560, p: 0.1806028546 },
    { y: 2880, p: 0.3314475708 },
    { y: 3200, p: 0.4822922869 },
    { y: 3520, p: 0.6331370031 },
    { y: 3840, p: 0.7839817193 },
    { y: 4160, p: 0.9348264355 },
    { y: 4290, p: 1.0000000000 }
  ];
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
  var journeyTargetDistance = 0;
  var journeyVisualDistance = 0;
  var continuousJourneyPath = null;
  var continuousJourneyLength = 0;
  var continuousAnchorDistances = [0,299.348,759.348,1238.524,1842.699,2342.699];
  var continuousSignalFractions = [0.059730002,0.196568864,0.399119984,0.600881674,0.862369111,1];

  /*
   * DOWNSTREAM — WHY + CONTACT.
   *
   * Same continuous controller and camera path. The input gain returns to 1.00
   * after Handover. These are cumulative distances along continuousJourneyPath,
   * measured from the live path at bind time (never hard-coded), in the order
   * authored in home.js:
   *
   * handover, whyIntro, reason01..04, whyExit, contact.
   */
  var downstreamAnchors = [];
  var downstreamFractions = [];
  var whyRuns = [];
  var whySignalLength = 0;
  var whyIntroElements = [];
  var whyReasonElements = [];
  var whyCoordinationElement = null;
  var whyGridElement = null;
  var whyFieldLightElement = null;
  var whyFieldDarkElement = null;
  var contactClusterElement = null;
  var contactPanelElement = null;
  var contactDecorElement = null;

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

  function dcIntroStop() {
    return (dcJourney && dcJourney.introStop) || dcJourney.cameraStart;
  }

  function updateDcIntroVisibility() {
    var atIntro = !!dcJourney &&
      activeRoute === "dataCenter" &&
      dcInputEnabled &&
      !dcReturning &&
      dcTargetY <= dcIntroStop().y + 0.5;
    document.body.classList.toggle("at-dc-intro", atIntro);
  }

  function dcProgress() {
    return (dcTargetY - dcJourney.cameraStart.y) /
      (dcJourney.cameraEnd.y - dcJourney.cameraStart.y);
  }

  function dcVisualProgress() {
    return clamp(
      (dcVisualY - dcJourney.cameraStart.y) /
        (dcJourney.cameraEnd.y - dcJourney.cameraStart.y),
      0,
      1
    );
  }

  function dcSignalPathProgress(y) {
    if (y <= dcSignalAnchors[0].y) return 0;
    for (var index = 1; index < dcSignalAnchors.length; index += 1) {
      var upper = dcSignalAnchors[index];
      if (y <= upper.y) {
        var lower = dcSignalAnchors[index - 1];
        var localProgress = (y - lower.y) / (upper.y - lower.y);
        return clamp(lower.p + (upper.p - lower.p) * localProgress, 0, 1);
      }
    }
    return 1;
  }

  function renderDcSignals(progress) {
    var contentReveals = (dcJourney && dcJourney.contentReveals) || [];
    contentReveals.forEach(function (definition) {
      var content = document.querySelector('[data-dc-content="' + definition.key + '"]');
      if (content) content.classList.toggle("is-active", progress >= definition.from);
    });
    var signalProgress = dcSignalPathProgress(dcVisualY);
    dcRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length * (1 - signalProgress));
    });
  }

  function bindDcSignals() {
    dcJourney = DATA.branchJourneys && DATA.branchJourneys.dataCenter;
    if (!dcJourney) return;

    dcRuns = Array.prototype.slice.call(
      document.querySelectorAll('[data-dc-signal="continuous"] path')
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
  }

  function itIntroStop() {
    return (itJourney && itJourney.introStop) || itJourney.cameraStart;
  }

  function updateItIntroVisibility() {
    var atIntro = !!itJourney &&
      activeRoute === "it" &&
      itInputEnabled &&
      !itReturning &&
      itTargetY <= itIntroStop().y + 0.5;
    document.body.classList.toggle("at-it-intro", atIntro);
  }

  function itProgress() {
    return (itTargetY - itJourney.cameraStart.y) /
      (itJourney.cameraEnd.y - itJourney.cameraStart.y);
  }

  function itVisualProgress() {
    return clamp(
      (itVisualY - itJourney.cameraStart.y) /
        (itJourney.cameraEnd.y - itJourney.cameraStart.y),
      0,
      1
    );
  }

  function itSignalPathProgress(y) {
    if (y <= itSignalAnchors[0].y) return 0;
    for (var index = 1; index < itSignalAnchors.length; index += 1) {
      var upper = itSignalAnchors[index];
      if (y <= upper.y) {
        var lower = itSignalAnchors[index - 1];
        var localProgress = (y - lower.y) / (upper.y - lower.y);
        return clamp(lower.p + (upper.p - lower.p) * localProgress, 0, 1);
      }
    }
    return 1;
  }

  function renderItSignals(progress) {
    var contentReveals = (itJourney && itJourney.contentReveals) || [];
    contentReveals.forEach(function (definition) {
      var content = document.querySelector('[data-it-content="' + definition.key + '"]');
      if (content) content.classList.toggle("is-active", progress >= definition.from);
    });
    var signalProgress = itSignalPathProgress(itVisualY);
    itRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length * (1 - signalProgress));
    });
  }

  function bindItSignals() {
    itJourney = DATA.branchJourneys && DATA.branchJourneys.it;
    if (!itJourney) return;
    itRuns = Array.prototype.slice.call(
      document.querySelectorAll('[data-it-signal="continuous"] path')
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
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

  /*
   * The AV back control is a RESTING-STATE affordance for the AV intro only.
   *
   * Visibility is derived from actual route state — the active route, the
   * settled/returning flags and the AV target stop — never from the viewport.
   * The AV wheel clamp floors avTargetY at introStop, so any forward input
   * toward the AV service overview lifts it off the intro and hides the
   * control; reversing back down to the intro restores it.
   */
  function updateAvIntroVisibility() {
    var atIntro = !!avJourney &&
      activeRoute === "av" &&
      avInputEnabled &&
      !avReturning &&
      avTargetY <= avIntroStop().y + 0.5;
    document.body.classList.toggle("at-av-intro", atIntro);
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
    continuousJourneyPath = createSampledPath(howJourney.continuousCameraPath);
    continuousJourneyLength = continuousJourneyPath.length;
    continuousAnchorDistances = howJourney.cameraStops.slice(1).map(function (anchor) {
      return distanceAtPoint(continuousJourneyPath, anchor);
    });
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
    bindWhyContact();
  }

  /*
   * Bind the Why/Contact downstream data.
   *
   * The authored anchor distances are validation values only; the live
   * distances below are derived mechanically from the extended camera path.
   */
  function bindWhyContact() {
    var downstream = howJourney && howJourney.downstream;
    if (!downstream || !continuousJourneyPath) return;

    downstreamAnchors = downstream.cameraAnchors.map(function (anchor) {
      return distanceAtPoint(continuousJourneyPath, anchor);
    });
    downstreamFractions = downstream.signal.fractions.slice();

    whyRuns = Array.prototype.slice.call(
      document.querySelectorAll(
        '[data-why-signal="' + downstream.signal.key + '"] path'
      )
    ).map(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      return { element: path, length: length };
    });
    whySignalLength = whyRuns.length ? whyRuns[0].length : 0;

    whyIntroElements = Array.prototype.slice.call(
      document.querySelectorAll(".why-kicker,.why-headline,.why-support")
    );
    whyReasonElements = Array.prototype.slice.call(
      document.querySelectorAll(".why-reason")
    );
    whyCoordinationElement = document.querySelector(".why-coordination");
    whyGridElement = document.querySelector(".why-contact-grid");
    whyFieldLightElement = document.querySelector(".why-contact-light");
    whyFieldDarkElement = document.querySelector(".why-contact-dark");
    contactClusterElement = document.querySelector(".contact-cluster");
    contactPanelElement = document.querySelector(".contact-panel");
    contactDecorElement = document.querySelector(".contact-decor");

    renderDownstream(0);
  }

  function setWhySignalFraction(fraction) {
    var revealDistance = whySignalLength * clamp(fraction, 0, 1);
    whyRuns.forEach(function (run) {
      run.element.style.strokeDashoffset = String(run.length - revealDistance);
    });
  }

  /*
   * Why -> Contact signal colour.
   *
   * Light ground  core #2f1650 / glow #b083ae
   * Dark contact  core #f3e9ff / glow #c9a4ff
   *
   * Applied to the whole visible Why/Contact run including the existing How
   * endpoint at (1142,5960), so the line never changes hue at the seam.
   */
  function applyWhySignalColor(progress) {
    var t = clamp(progress, 0, 1);
    var core = "rgb(" + [
      mixChannel(47, 243, t),
      mixChannel(22, 233, t),
      mixChannel(80, 255, t)
    ].join(",") + ")";
    var glow = "rgb(" + [
      mixChannel(176, 201, t),
      mixChannel(131, 164, t),
      mixChannel(174, 255, t)
    ].join(",") + ")";
    howContinuousRuns.concat(whyRuns).forEach(function (run) {
      if (run.element.classList.contains("sig-core")) run.element.style.stroke = core;
      else if (run.element.classList.contains("sig-glow")) run.element.style.stroke = glow;
    });
  }

  function span(distance, from, to) {
    if (to <= from) return distance >= to ? 1 : 0;
    return clamp((distance - from) / (to - from), 0, 1);
  }

  function setOpacity(element, value) {
    if (element) element.style.opacity = String(value);
  }

  /*
   * Continuous Why/Contact emphasis.
   *
   * Everything here is a function of the VISUAL camera distance. Nothing
   * snaps, nothing is threshold-activated, and the user may stop anywhere.
   */
  function renderDownstream(distance) {
    if (!downstreamAnchors.length) return;

    var handover = downstreamAnchors[0];
    var intro = downstreamAnchors[1];
    var reason04 = downstreamAnchors[5];
    var contact = downstreamAnchors[7];

    /* Signal is 0 at Handover, then reveals left to x=960 before descending. */
    setWhySignalFraction(
      piecewise(
        clamp(distance, handover, contact),
        downstreamAnchors,
        downstreamFractions
      )
    );

    /*
     * Handover -> Why Intro crossfade.
     *
     * Guarded at the Handover anchor so the upstream How stage crossfade
     * still owns Handover emphasis on the approved part of the journey.
     */
    var enter = span(distance, handover, intro);
    var eased = smooth(enter);
    if (distance > handover) {
      setOpacity(howStageElements[5], 1 - 0.86 * eased);
    }

    /* Local Reason 04 -> Contact progress. */
    var s = span(distance, reason04, contact);

    /* Reason emphasis: intro at 1, then one active box at a time. */
    var introToOne = span(distance, intro, downstreamAnchors[2]);
    var late = fadeWindow(s, 0.38, 0.78);
    var introOpacity = eased * (1 - 0.82 * smooth(introToOne));
    whyIntroElements.forEach(function (element) {
      setOpacity(element, introOpacity - (introOpacity - 0.06) * late);
    });

    whyReasonElements.forEach(function (element, index) {
      var value;
      if (index === 3) {
        /* Reason 04 keeps its own authored fade into Contact. */
        value = 0.14 + 0.86 * smooth(span(distance, downstreamAnchors[4], reason04));
        value = value - (value - 0.14) * fadeWindow(s, 0.10, 0.56);
      } else {
        var rise = smooth(span(distance, downstreamAnchors[index + 1], downstreamAnchors[index + 2]));
        var fall = smooth(span(distance, downstreamAnchors[index + 2], downstreamAnchors[index + 3]));
        value = 0.14 + 0.86 * (rise - fall);
      }
      value = value * eased;
      setOpacity(element, value - (value - 0.06) * late);
    });

    /* Environmental image emphasis follows the same visual-camera distance. */
    setOpacity(whyCoordinationElement, smoothPiecewise(
      clamp(distance, intro, downstreamAnchors[6]),
      downstreamAnchors.slice(1, 7),
      [0.35, 0.55, 1, 1, 0.55, 0.20]
    ));

    /* Light -> dark field. Smoothstep, no seam, no strip. */
    setOpacity(whyFieldLightElement, 1 - fadeWindow(s, 0.08, 0.72));
    setOpacity(whyFieldDarkElement, fadeWindow(s, 0.10, 0.74));

    /* Why grid out, About-style contact texture in. */
    setOpacity(whyGridElement, 1 - fadeWindow(s, 0.18, 0.62));
    setOpacity(contactDecorElement, fadeWindow(s, 0.28, 0.76));

    /* Contact content. */
    var contactIn = fadeWindow(s, 0.38, 0.78);
    setOpacity(contactClusterElement, contactIn);
    setOpacity(contactPanelElement, contactIn);

    /* The line becomes luminous before the dark field dominates. */
    applyWhySignalColor(fadeWindow(s, 0.10, 0.30));
  }

  function smooth(t) {
    var v = clamp(t, 0, 1);
    return v * v * (3 - 2 * v);
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
    else if (source === "it") {
      itInputEnabled = false;
      itTargetY = itJourney.cameraEnd.y;
      itVisualY = itTargetY;
      itVisualState.y = itVisualY;
      renderItSignals(1);
    }
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
    updateDcIntroVisibility();
    updateItIntroVisibility();
    updateAvIntroVisibility();
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
      if (dcMoveFrame) {
        window.cancelAnimationFrame(dcMoveFrame);
        dcMoveFrame = 0;
      }
      window.gsap.killTweensOf(dcVisualState);
      dcTargetY = dcJourney.cameraEnd.y;
      dcVisualY = dcTargetY;
      dcVisualState.y = dcVisualY;
      renderDcSignals(dcVisualProgress());
      dcInputEnabled = true;
      updateDcIntroVisibility();
    } else if (source === "it") {
      if (itMoveFrame) {
        window.cancelAnimationFrame(itMoveFrame);
        itMoveFrame = 0;
      }
      window.gsap.killTweensOf(itVisualState);
      itTargetY = itJourney.cameraEnd.y;
      itVisualY = itTargetY;
      itVisualState.y = itVisualY;
      renderItSignals(itVisualProgress());
      itInputEnabled = true;
      updateItIntroVisibility();
    } else {
      avTargetY = avJourney.cameraEnd.y;
      avVisualY = avTargetY;
      avVisualState.y = avVisualY;
      renderAvSignals(1);
      avInputEnabled = true;
    }
    updateAvIntroVisibility();
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
        journeyTargetDistance = 0;
        journeyVisualDistance = 0;
        renderDownstream(0);
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
    journeyTargetDistance = 0;
    journeyVisualDistance = 0;
    renderDownstream(0);
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
    if (howTransitioning || !howWorkInputEnabled || !continuousJourneyPath) return;
    var runtime = window.SPACES_RUNTIME;
    var px = clamp(deltaPixels, -90, 90);
    if (px < 0 && journeyTargetDistance <= 0.001) { startHowWorkReverseTransition(); return; }
    var inputDistance = px / runtime.getPxPerUnit();
    var handoverDistance = continuousAnchorDistances[continuousAnchorDistances.length - 1];
    if (inputDistance > 0 && journeyTargetDistance < handoverDistance) {
      var forwardToHandover = (handoverDistance - journeyTargetDistance) / 1.25;
      journeyTargetDistance = inputDistance <= forwardToHandover
        ? journeyTargetDistance + inputDistance * 1.25
        : handoverDistance + inputDistance - forwardToHandover;
    } else if (inputDistance < 0 && journeyTargetDistance > handoverDistance) {
      var reverseToHandover = journeyTargetDistance - handoverDistance;
      journeyTargetDistance = -inputDistance <= reverseToHandover
        ? journeyTargetDistance + inputDistance
        : handoverDistance + (inputDistance + reverseToHandover) * 1.25;
    } else {
      journeyTargetDistance += inputDistance * (
        journeyTargetDistance < handoverDistance ||
        (journeyTargetDistance === handoverDistance && inputDistance < 0)
          ? 1.25
          : 1.00
      );
    }
    journeyTargetDistance = clamp(journeyTargetDistance, 0, continuousJourneyLength);
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
  function smoothPiecewise(distance, anchors, values) {
    for (var i = 1; i < anchors.length; i += 1) {
      if (distance <= anchors[i]) {
        var q = smooth((distance - anchors[i - 1]) / (anchors[i] - anchors[i - 1]));
        return values[i - 1] + (values[i] - values[i - 1]) * q;
      }
    }
    return values[values.length - 1];
  }
  function renderContinuousJourney() {
    var runtime = window.SPACES_RUNTIME;
    runtime.moveCameraTo(
      continuousJourneyPath.element.getPointAtLength(journeyVisualDistance),
      0,
      "none"
    );
    var distance = journeyVisualDistance;
    setHowSignalFraction(
      piecewise(distance, continuousAnchorDistances, continuousSignalFractions)
    );

    var index = 0;
    while (
      index < continuousAnchorDistances.length - 1 &&
      distance > continuousAnchorDistances[index + 1]
    ) {
      index += 1;
    }
    var nextIndex = Math.min(index + 1, howStageElements.length - 1);
    var span = continuousAnchorDistances[nextIndex] - continuousAnchorDistances[index];
    var stageProgress = span > 0
      ? clamp((distance - continuousAnchorDistances[index]) / span, 0, 1)
      : 0;

    howStageElements.forEach(function (element, stageIndex) {
      if (index === nextIndex) {
        element.style.opacity = stageIndex === index ? "1" : "0.14";
      } else if (stageIndex === index) {
        element.style.opacity = String(1 - .86 * stageProgress);
      } else if (stageIndex === nextIndex) {
        element.style.opacity = String(.14 + .86 * stageProgress);
      } else {
        element.style.opacity = "0.14";
      }
    });

    var gate = document.querySelector(".readiness-gate");
    if (gate && howStageElements[2]) {
      gate.style.opacity = howStageElements[2].style.opacity;
    }

    renderDownstream(distance);
  }

  function scheduleDcCameraMove() {
    if (dcMoveFrame) return;
    dcMoveFrame = window.requestAnimationFrame(function () {
      var runtime = window.SPACES_RUNTIME;
      var targetY = dcTargetY;
      dcMoveFrame = 0;
      if (!runtime || !dcInputEnabled || dcReturning) return;
      runtime.moveCameraTo({ x: 1940, y: targetY }, 0.42, "power2.out");
      dcVisualState.y = dcVisualY;
      window.gsap.to(dcVisualState, {
        y: targetY,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
        onUpdate: function () {
          dcVisualY = dcVisualState.y;
          renderDcSignals(dcVisualProgress());
        }
      });
    });
  }

  function moveDcCamera(deltaPixels, allowHowEntry) {
    var runtime = window.SPACES_RUNTIME;
    if (!dcInputEnabled || dcReturning || !runtime) return;

    if (
      allowHowEntry &&
      dcTargetY >= dcJourney.cameraEnd.y - 0.5 &&
      deltaPixels > 12
    ) {
      if (Math.abs(dcVisualY - dcJourney.cameraEnd.y) > 1) return;
      if (dcMoveFrame) {
        window.cancelAnimationFrame(dcMoveFrame);
        dcMoveFrame = 0;
      }
      window.gsap.killTweensOf(dcVisualState);
      dcTargetY = dcJourney.cameraEnd.y;
      dcVisualY = dcTargetY;
      dcVisualState.y = dcVisualY;
      renderDcSignals(1);
      runtime.moveCameraTo(
        { x: 1940, y: dcJourney.cameraEnd.y },
        0,
        "none",
        function () { enterHowEntry("dataCenter"); }
      );
      return;
    }
    deltaPixels = clamp(deltaPixels, -90, 90);
    dcTargetY = clamp(
      dcTargetY + (deltaPixels / runtime.getPxPerUnit()) * 1.25,
      dcIntroStop().y,
      dcJourney.cameraEnd.y
    );
    updateDcIntroVisibility();
    scheduleDcCameraMove();
  }

  function scheduleItCameraMove() {
    if (itMoveFrame) return;
    itMoveFrame = window.requestAnimationFrame(function () {
      var runtime = window.SPACES_RUNTIME;
      var targetY = itTargetY;
      itMoveFrame = 0;
      if (!runtime || !itInputEnabled || itReturning) return;
      runtime.moveCameraTo({ x: 1140, y: targetY }, 0.42, "power2.out");
      itVisualState.y = itVisualY;
      window.gsap.to(itVisualState, {
        y: targetY,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
        onUpdate: function () {
          itVisualY = itVisualState.y;
          renderItSignals(itVisualProgress());
        }
      });
    });
  }

  function moveItCamera(deltaPixels, allowHowEntry) {
    var runtime = window.SPACES_RUNTIME;
    if (!itInputEnabled || itReturning || !runtime) return;
    if (
      allowHowEntry &&
      itTargetY >= itJourney.cameraEnd.y - 0.5 &&
      deltaPixels > 12
    ) {
      if (Math.abs(itVisualY - itJourney.cameraEnd.y) > 1) return;
      if (itMoveFrame) {
        window.cancelAnimationFrame(itMoveFrame);
        itMoveFrame = 0;
      }
      window.gsap.killTweensOf(itVisualState);
      itTargetY = itJourney.cameraEnd.y;
      itVisualY = itTargetY;
      itVisualState.y = itVisualY;
      renderItSignals(1);
      runtime.moveCameraTo(
        { x: 1140, y: itJourney.cameraEnd.y },
        0,
        "none",
        function () { enterHowEntry("it"); }
      );
      return;
    }
    deltaPixels = clamp(deltaPixels, -90, 90);
    itTargetY = clamp(
      itTargetY + (deltaPixels / runtime.getPxPerUnit()) * 1.25,
      itIntroStop().y,
      itJourney.cameraEnd.y
    );
    updateItIntroVisibility();
    scheduleItCameraMove();
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
      avTargetY + (deltaPixels / runtime.getPxPerUnit()) * 1.25,
      avIntroStop().y,
      avJourney.cameraEnd.y
    );
    updateAvIntroVisibility();
    scheduleAvCameraMove();
  }

  function onWheel(event) {
    if (activeRoute === "hub") {
      return;
    }
    if (activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howEntry" && activeRoute !== "howWork") return;
    event.preventDefault();
    if (howTransitioning) return;
    if (activeRoute === "dataCenter") moveDcCamera(wheelPixels(event), true);
    else if (activeRoute === "it") moveItCamera(wheelPixels(event), true);
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
    if ((activeRoute === "dataCenter" || activeRoute === "it" || activeRoute === "av" || activeRoute === "howEntry" || activeRoute === "howWork") && event.touches.length) {
      touchY = event.touches[0].clientY;
    }
  }

  function onTouchMove(event) {
    if ((activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howEntry" && activeRoute !== "howWork") || touchY === null || !event.touches.length) return;
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
          dcTargetY = dcIntroStop().y;
          dcVisualY = dcTargetY;
          dcVisualState.y = dcVisualY;
          dcInputEnabled = true;
          renderDcSignals(dcVisualProgress());
        } else if (route === "it") {
          itTargetY = itIntroStop().y;
          itVisualY = itTargetY;
          itVisualState.y = itVisualY;
          itInputEnabled = true;
          renderItSignals(itVisualProgress());
        } else if (route === "av") {
          avTargetY = avIntroStop().y;
          avVisualY = avTargetY;
          avVisualState.y = avVisualY;
          avInputEnabled = true;
          renderAvSignals(avVisualProgress());
        }
        updateDcIntroVisibility();
        updateItIntroVisibility();
        updateAvIntroVisibility();
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
          "at-dc-intro",
          "at-it-intro",
          "how-source-dc",
          "how-source-it",
          "how-source-av"
        );
        activeRoute = "hub";
        dcReturning = false;
        dcInputEnabled = false;
        updateDcIntroVisibility();
        itReturning = false;
        itInputEnabled = false;
        updateItIntroVisibility();
        itTargetY = itJourney ? itIntroStop().y : 1840;
        itVisualY = itTargetY;
        itVisualState.y = itVisualY;
        if (itMoveFrame) {
          window.cancelAnimationFrame(itMoveFrame);
          itMoveFrame = 0;
        }
        if (itJourney) renderItSignals(itVisualProgress());
        avReturning = false;
        avInputEnabled = false;
        updateAvIntroVisibility();
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
        dcTargetY = dcJourney ? dcIntroStop().y : 1340;
        dcVisualY = dcTargetY;
        dcVisualState.y = dcVisualY;
        if (dcMoveFrame) {
          window.cancelAnimationFrame(dcMoveFrame);
          dcMoveFrame = 0;
        }
        if (dcJourney) renderDcSignals(dcVisualProgress());
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
      updateAvIntroVisibility();
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
      updateItIntroVisibility();
      var itDuration = 0.55 + itProgress() * 0.65;
      if (itMoveFrame) {
        window.cancelAnimationFrame(itMoveFrame);
        itMoveFrame = 0;
      }
      itVisualState.y = itVisualY;
      window.gsap.to(itVisualState, {
        y: itIntroStop().y,
        duration: itDuration,
        ease: "power3.inOut",
        overwrite: true,
        onUpdate: function () {
          itVisualY = itVisualState.y;
          renderItSignals(itVisualProgress());
        }
      });
      runtime.moveCameraTo(itIntroStop(), itDuration, "power3.inOut", function () {
        itTargetY = itIntroStop().y;
        itVisualY = itTargetY;
        itVisualState.y = itVisualY;
        renderItSignals(itVisualProgress());
        completeReturnToHub(returningRoute);
      });
      return;
    }

    dcInputEnabled = false;
    dcReturning = true;
    updateDcIntroVisibility();
    var dcDuration = 0.55 + dcProgress() * 0.65;
    if (dcMoveFrame) {
      window.cancelAnimationFrame(dcMoveFrame);
      dcMoveFrame = 0;
    }
    dcVisualState.y = dcVisualY;
    window.gsap.to(dcVisualState, {
      y: dcIntroStop().y,
      duration: dcDuration,
      ease: "power3.inOut",
      overwrite: true,
      onUpdate: function () {
        dcVisualY = dcVisualState.y;
        renderDcSignals(dcVisualProgress());
      }
    });
    runtime.moveCameraTo(dcIntroStop(), dcDuration, "power3.inOut", function () {
      dcTargetY = dcIntroStop().y;
      dcVisualY = dcTargetY;
      dcVisualState.y = dcVisualY;
      renderDcSignals(dcVisualProgress());
      completeReturnToHub(returningRoute);
    });
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
