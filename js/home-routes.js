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
  var avTargetY = 1530;
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
  var howSignalMilestones = [0];
  var howWorkInputEnabled = false;
  var howWorkReturning = false;
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

  function avProgress() {
    return (avTargetY - avJourney.cameraStart.y) /
      (avJourney.cameraEnd.y - avJourney.cameraStart.y);
  }

  function renderAvSignals(progress) {
    avRuns.forEach(function (group) {
      var range = group.definition.window.to - group.definition.window.from;
      var reveal = clamp((progress - group.definition.window.from) / range, 0, 1);
      group.runs.forEach(function (run) {
        run.element.style.strokeDashoffset = String(run.length * (1 - reveal));
      });
    });
  }

  function bindAvSignals() {
    avJourney = DATA.branchJourneys && DATA.branchJourneys.av;
    if (!avJourney) return;
    avRuns = avJourney.signals.map(function (definition) {
      var paths = Array.prototype.slice.call(
        document.querySelectorAll('[data-av-signal="' + definition.key + '"] path')
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
    var p = clamp(progress, 0, 1);
    if (p < definition.windows[0].from) return 0;
    if (p >= 1) return howContinuousSignalLength;

    for (var index = 0; index < definition.windows.length; index += 1) {
      var windowData = definition.windows[index];
      if (p <= windowData.to) {
        var normalized = clamp(
          (p - windowData.from) / (windowData.to - windowData.from),
          0,
          1
        );
        var start = howSignalMilestones[index];
        var end = howSignalMilestones[index + 1];
        return start + (end - start) * normalized;
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
    howSignalMilestones = [0];
    howJourney.signals.forEach(function (definition) {
      howSignalMilestones.push(
        howSignalMilestones[howSignalMilestones.length - 1] +
          measurePathLength(definition.d)
      );
    });
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
    if (source === "dataCenter") dcInputEnabled = false;
    else if (source === "it") itInputEnabled = false;
    else avInputEnabled = false;
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

  function activateHowJourney() {
    if (!howInputEnabled || howReturning || !howJourneyPath) return;
    howInputEnabled = false;
    howWorkInputEnabled = true;
    killHowRenderTween();
    howTargetDistance = 0;
    howRenderedDistance = 0;
    howRenderState.distance = 0;
    renderHowJourney(0);
    activeRoute = "howWork";
    document.body.classList.remove("route-how-entry");
    document.body.classList.add("route-how-work");
  }

  function restoreHowEntry() {
    killHowRenderTween();
    howTargetDistance = 0;
    howRenderedDistance = 0;
    howRenderState.distance = 0;
    renderHowJourney(0);
    howWorkInputEnabled = false;
    howWorkReturning = false;
    howInputEnabled = true;
    activeRoute = "howEntry";
    document.body.classList.remove("route-how-work");
    document.body.classList.add("route-how-entry");
  }

  function moveHowJourney(deltaPixels) {
    var runtime = window.SPACES_RUNTIME;
    if (!howWorkInputEnabled || howWorkReturning || !runtime || !howJourneyPath) return;
    if (howProgress >= 0.999 && deltaPixels > 12) {
      activateWhyJourney();
      return;
    }
    if (
      howTargetDistance <= 0 &&
      howRenderedDistance <= 0.5 &&
      deltaPixels < -12
    ) {
      restoreHowEntry();
      return;
    }
    if (howTargetDistance >= howPathLength && deltaPixels > 0) return;
    var nextTargetDistance = clamp(
      howTargetDistance + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      0,
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
    howWorkInputEnabled = false;
    howWorkReturning = true;
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
    runtime.moveCameraTo({ x: 355, y: dcTargetY }, 0.34, "power2.out");
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

  function moveAvCamera(deltaPixels, allowHowEntry) {
    var runtime = window.SPACES_RUNTIME;
    if (!avInputEnabled || avReturning || !runtime) return;
    if (allowHowEntry && avProgress() >= 0.995 && deltaPixels > 12) {
      enterHowEntry("av");
      return;
    }
    avTargetY = clamp(
      avTargetY + (deltaPixels / runtime.getPxPerUnit()) * 0.82,
      avJourney.cameraStart.y,
      avJourney.cameraEnd.y
    );
    renderAvSignals(avProgress());
    runtime.moveCameraTo({ x: 1960, y: avTargetY }, 0.34, "power2.out");
  }

  function onWheel(event) {
    if (activeRoute === "hub") {
      return;
    }
    if (activeRoute !== "dataCenter" && activeRoute !== "it" && activeRoute !== "av" && activeRoute !== "howEntry" && activeRoute !== "howWork" && activeRoute !== "whySpaces" && activeRoute !== "finalCta") return;
    event.preventDefault();
    if (activeRoute === "dataCenter") moveDcCamera(event.deltaY, true);
    else if (activeRoute === "it") moveItCamera(event.deltaY, true);
    else if (activeRoute === "av") moveAvCamera(event.deltaY, true);
    else if (activeRoute === "howWork") moveHowJourney(event.deltaY);
    else if (activeRoute === "whySpaces") moveWhyJourney(event.deltaY);
    else if (activeRoute === "finalCta") moveCtaJourney(event.deltaY);
    else if (howInputEnabled && event.deltaY > 12) activateHowJourney();
    else if (howInputEnabled && event.deltaY < -12) leaveHowEntry(false);
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
          avTargetY = avJourney.cameraStart.y;
          avInputEnabled = true;
          renderAvSignals(0);
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
        avTargetY = avJourney ? avJourney.cameraStart.y : 1530;
        if (avJourney) renderAvSignals(0);
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
      avRuns.forEach(function (group) {
        window.gsap.to(group.runs.map(function (run) { return run.element; }), {
          strokeDashoffset: function (index) { return group.runs[index].length; },
          duration: Math.min(0.42, avDuration),
          ease: "power2.inOut",
          overwrite: true
        });
      });
      runtime.moveCameraTo(avJourney.cameraStart, avDuration, "power3.inOut", function () {
        avTargetY = avJourney.cameraStart.y;
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
      updateHubReady();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
