/* Spaces Solutions — homepage-only loader and Hero mark effects. */
(function () {
  "use strict";

  var gsap = window.gsap;
  var loader = document.getElementById("loader");
  var loaderMark = document.getElementById("loaderMark");
  var heroMark = document.getElementById("heroMark");
  var headerWordmark = document.querySelector(".header-wordmark");
  var loaderWordmark = document.querySelector(".loader-wordmark");
  var reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobile = window.innerWidth <= 820;
  var pageReady = document.readyState === "complete";
  var minimumFinished = false;
  var released = false;
  var heroEntranceRan = false;
  var heroEyebrow = document.querySelector(".chapter-hero .eyebrow");
  var heroLines = document.querySelectorAll(".hero-line-inner");
  var heroBody = document.querySelector(".hero-body");
  var heroCta = document.querySelector(".hero-cta");
  var heroCue = document.querySelector(".hero-cue");
  if (heroCue) {
    heroCue.addEventListener("click", function () {
      var distance = window.innerHeight * 0.75;
      window.scrollTo({
        top: window.scrollY + distance,
        behavior: "smooth"
      });
    });
  }
  var heroEntranceTargets = [heroEyebrow, heroBody, heroCta, heroCue]
    .concat(Array.prototype.slice.call(heroLines))
    .filter(Boolean);
  var aboutView1Targets = document.querySelectorAll(
    ".about-view1-kicker,.about-view1-headline,.about-view1-body"
  );
  var aboutView1Image = document.querySelector(".about-overview");
  var aboutView2Kicker = document.querySelector(".about-view2-kicker");
  var aboutView2Headline = document.querySelector(".about-view2-headline");
  var aboutView2Body = document.querySelector(".about-view2-body");
  var aboutView2MissionLabel = document.querySelector(".statement-mission .statement-label");
  var aboutView2MissionBody = document.querySelector(".statement-mission .statement-copy");
  var aboutView2VisionLabel = document.querySelector(".statement-vision .statement-label");
  var aboutView2VisionBody = document.querySelector(".statement-vision .statement-copy");
  var aboutView2Process = document.querySelectorAll(".about-process li");

  function showHeroImmediately() {
    heroEntranceTargets.forEach(function (element) {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  }

  function runHeroEntrance() {
    if (heroEntranceRan) return;
    heroEntranceRan = true;

    if (reduced || !gsap || !heroEyebrow || heroLines.length !== 2 ||
        !heroBody || !heroCta || !heroCue) {
      showHeroImmediately();
      return;
    }

    gsap.timeline()
      .to(heroEyebrow, {
        opacity: 1, y: 0, duration: 0.45, ease: "power2.out"
      }, 0.00)
      .to(heroLines[0], {
        opacity: 1, yPercent: 0, duration: 0.72, ease: "power3.out"
      }, 0.08)
      .to(heroLines[1], {
        opacity: 1, yPercent: 0, duration: 0.72, ease: "power3.out"
      }, 0.17)
      .to(heroBody, {
        opacity: 1, y: 0, duration: 0.55, ease: "power2.out"
      }, 0.37)
      .to(heroCta, {
        opacity: 1, y: 0, scale: 1, duration: 0.50, ease: "power2.out"
      }, 0.52)
      .to(heroCue, {
        opacity: 1, y: 0, duration: 0.45, ease: "power2.out"
      }, 0.68);
  }

  if (!loader || !loaderMark || !heroMark || !gsap) {
    document.body.classList.remove("loading");
    showHeroImmediately();
    return;
  }

  if (reduced) {
    showHeroImmediately();
  } else {
    gsap.set(heroEyebrow, { opacity: 0, y: "0.8rem" });
    gsap.set(heroLines, { opacity: 0, y: 0, yPercent: 110 });
    gsap.set(heroBody, { opacity: 0, y: "0.8rem" });
    gsap.set(heroCta, { opacity: 0, y: "0.6rem", scale: 0.96 });
    gsap.set(heroCue, { opacity: 0, y: "0.4rem" });
  }

  Array.prototype.slice.call(heroMark.children).forEach(function (circle) {
    loaderMark.appendChild(circle.cloneNode(false));
  });

  if (headerWordmark && loaderWordmark) {
    loaderWordmark.src = headerWordmark.src;
  }

  var loaderDots = Array.prototype.slice.call(loaderMark.querySelectorAll("circle"));
  var heroDots = Array.prototype.slice.call(heroMark.querySelectorAll("circle"));
  var sourceDot = heroDots[54];

  if (sourceDot) {
    sourceDot.classList.add("hero-source-dot");
  }

  function releaseIfReady() {
    if (released || !pageReady || !minimumFinished) return;
    released = true;

    gsap.to(loader, {
      opacity: 0,
      duration: reduced ? 0.16 : 0.42,
      ease: "power1.out",
      onComplete: function () {
        loader.style.display = "none";
        loader.style.pointerEvents = "none";
        document.body.classList.remove("loading");
        window.scrollTo(0, 0);
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        runHeroEntrance();
      }
    });
  }

  window.addEventListener("load", function () {
    pageReady = true;
    releaseIfReady();
  }, { once: true });

  if (reduced) {
    gsap.set(loaderDots, { x: 0, y: 0, scale: 1, opacity: 1 });
    gsap.set(loaderWordmark, { opacity: 1, y: 0 });
    gsap.set(".loader-bar-fill", { scaleX: 1 });
    document.querySelector(".loader-count").textContent = "100%";
    gsap.delayedCall(0.12, function () {
      minimumFinished = true;
      releaseIfReady();
    });
  } else {
    loaderDots.forEach(function (dot, i) {
      var angle = ((i * 137.508 + 18) % 360) * Math.PI / 180;
      var radius = 160 + (i % 6) * 42;
      gsap.set(dot, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.78,
        scale: 0.46 + (i % 4) * 0.06,
        opacity: 0.16 + (i % 3) * 0.05,
        transformOrigin: "center"
      });
    });

    var count = { value: 0 };
    var timeline = gsap.timeline({
      onComplete: function () {
        minimumFinished = true;
        releaseIfReady();
      }
    });

    timeline.to(loaderDots, {
      x: 0, y: 0, scale: 1, opacity: 1,
      duration: 0.375,
      ease: "power3.out",
      stagger: 0.011
    }, 0.10);
    timeline.to(loaderWordmark, {
      opacity: 1, duration: 0.40, ease: "power2.out"
    }, 0.78);
    timeline.fromTo(loaderWordmark, { y: 8 }, { y: 0, duration: 0.40 }, 0.78);
    timeline.to(count, {
      value: 100,
      duration: 1.55,
      ease: "none",
      onUpdate: function () {
        document.querySelector(".loader-count").textContent =
          Math.round(count.value) + "%";
      }
    }, 0);
    timeline.to(".loader-bar-fill", {
      scaleX: 1, duration: 1.55, ease: "none"
    }, 0);
    timeline.to({}, { duration: 0.10 }, 1.55);
  }

  if (mobile || reduced) {
    gsap.set(heroDots, { x: 0, y: 0, scale: 1, opacity: 1 });
    return;
  }

  var scatter = heroDots.map(function (dot, i) {
    var dx = (((i * 73) % 17) - 8) * 5.2;
    var dy = (((i * 47) % 19) - 9) * 4.8;
    var cx = parseFloat(dot.getAttribute("cx"));
    if (cx < 90) dx += 16;
    if (cx > 185) dx -= 8;
    return {
      dx: dx,
      dy: dy,
      scale: 0.56 + (i % 4) * 0.055,
      opacity: 0.30 + (i % 3) * 0.06,
      delay: (i % 11) * 0.012
    };
  });

  function smooth(value) {
    value = Math.max(0, Math.min(1, value));
    return value * value * (3 - 2 * value);
  }

  function applyAboutReveal(arcProgress) {
    if (mobile || reduced || !gsap) return;

    var view1 = smooth((arcProgress - 0.14) / (0.211198 - 0.14));
    var image = smooth((arcProgress - 0.22) / (0.287998 - 0.22));
    function reveal(element, from, to) {
      if (!element) return;
      var amount = smooth((arcProgress - from) / (to - from));
      gsap.set(element, {
        opacity: amount,
        y: (1 - amount) * 10
      });
    }

    gsap.set(aboutView1Targets, {
      opacity: view1,
      y: (1 - view1) * 8
    });
    gsap.set(aboutView1Image, {
      opacity: image,
      y: (1 - image) * 8
    });
    reveal(aboutView2Kicker, 0.484014, 0.517015);
    reveal(aboutView2Headline, 0.500515, 0.555016);
    reveal(aboutView2Body, 0.550016, 0.605018);
    reveal(aboutView2MissionLabel, 0.610518, 0.638519);
    reveal(aboutView2MissionBody, 0.632519, 0.687520);
    reveal(aboutView2VisionLabel, 0.704021, 0.731522);
    reveal(aboutView2VisionBody, 0.726022, 0.792024);
    Array.prototype.forEach.call(aboutView2Process, function (row, index) {
      var from = 0.698521 + index * 0.016501;
      reveal(row, from, from + 0.027501);
    });
  }

  function applyHero(holdProgress) {
    heroDots.forEach(function (dot, i) {
      var state = scatter[i];
      var amount = smooth(
        (holdProgress - 0.10 - state.delay) /
        (0.48 - state.delay)
      );
      var scale = state.scale + (1 - state.scale) * amount;
      var filter = "none";

      if (i === 54 && holdProgress >= 0.52 && holdProgress <= 0.64) {
        var pulse = 1 - Math.abs(holdProgress - 0.58) / 0.06;
        scale *= 1 + Math.max(0, pulse) * 0.32;
        filter = "drop-shadow(0 0 5px rgba(243,233,255,.72))";
      }

      gsap.set(dot, {
        x: state.dx * (1 - amount),
        y: state.dy * (1 - amount),
        scale: scale,
        opacity: state.opacity + (1 - state.opacity) * amount,
        filter: filter
      });
    });
  }

  applyHero(0);
  applyAboutReveal(0);
  window.addEventListener("spaces:progress", function (event) {
    applyHero(event.detail.holdProgress);
    applyAboutReveal(event.detail.arcProgress);
  });
})();
