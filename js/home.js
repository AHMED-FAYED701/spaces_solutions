/*
 * Spaces Solutions — Homepage Spatial Data
 *
 * IMPORTANT:
 * This file contains page-specific geometry calculated by Mastermind.
 * engine.js executes this data; it must not redesign or recalculate it.
 */

window.SPACES_HOME = {
  scale: {
    unitsPerRem: 10,
    viewportWidthUnits: 711
  },

  world: {
    w: 2340,
    h: 6220
  },

  scroll: {
    holdScreens: 0
  },

  signalSpec: {
    halo: 22,
    glow: 9,
    core: 2.8
  },

  /*
   * CHAPTER 01 — HERO
   *
   * World:
   * x 0 → 740
   * y 0 → 450
   */
  chapters: {
    c01: {
      key: "c01",
      type: "dark",
      x: 0,
      y: 0,
      w: 740,
      h: 450,

      cameraStop: {
        x: 355,
        y: 200
      },

      content: {
        columnX: 72
      },

      mark: {
        cx: 565,
        cy: 175,
        size: 250,

        bounds: {
          x0: 440,
          x1: 690,
          y0: 50,
          y1: 300
        }
      }
    },

    /* CHAPTER 02 — WHO WE ARE / World x 0 → 740, y 450 → 1270 */
    c02: {
      key: "c02",
      type: "paper",
      x: 0,
      y: 450,
      w: 740,
      h: 512,

      cameraStop: {
        x: 355,
        y: 640
      },

      localCameraCentre: {
        x: 355,
        y: 190
      },

      copy: {
        x: 146,
        y: 48,
        w: 270
      },

      visual: {
        x: 350,
        y: 182,
        w: 380,
        h: 253
      }
    },

    c04: {
      key: "c04",
      type: "paper",
      x: 740,
      y: 450,
      w: 800,
      h: 512,

      cameraStop: {
        x: 1070,
        y: 730
      }
    },

    /*
     * CHAPTER 05 — SOLUTIONS / DIVISIONS HUB
     *
     * World:
     * x 740 -> 1540
     * y 962 -> 1462
     *
     * The dark Solutions ground begins intentionally at the About seam (y=962).
     * There is no transition filler between About and Solutions.
     */
    c05: {
      key: "c05",
      type: "dark",
      x: 740,
      y: 962,
      w: 800,
      h: 500,

      cameraStop: {
        x: 1140,
        y: 1230
      },

      copy: {
        x: 980,
        y: 1096,
        w: 320,
        align: "center"
      },

      cards: {
        y: 1248,
        w: 190,
        h: 140,

        av: { x: 800, cx: 895 },
        it: { x: 1045, cx: 1140 },
        dataCenter: { x: 1290, cx: 1385 }
      }
    },

    c06dc: {
      key: "c06-dc",
      type: "dark",
      x: 1540,
      y: 1020,
      w: 800,
      h: 500,
      cameraStop: { x: 1960, y: 1260 }
    },

    dcServices: {
      key: "dc-services",
      type: "dark",
      x: 1540,
      y: 1520,
      w: 800,
      h: 2500
    },

    itServices: {
      key: "it-services",
      type: "dark",
      x: 740,
      y: 2020,
      w: 800,
      h: 2610
    },

    c06av: {
      key: "c06-av",
      type: "dark",
      x: 0,
      y: 1020,
      w: 740,
      h: 500,

      /*
       * Intro camera stop lowered to y=1340 so the lower composition
       * band (kicker 1295 / headline 1322 / body 1420) is fully framed.
       */
      cameraStop: { x: 355, y: 1340 }
    },

    avServices: {
      key: "av-services",
      type: "dark",
      x: 0,
      y: 1520,
      w: 740,
      h: 2500
    },

    c06it: {
      key: "c06-it",
      type: "dark",
      x: 740,
      y: 1520,
      w: 800,
      h: 500,
      cameraStop: { x: 1160, y: 1750 }
    },

    howEntry: {
      key: "how-shared-entry",
      type: "dark",
      x: 0,
      y: 4520,
      w: 2340,
      h: 500,
      cameraStop: { x: 1160, y: 4840 }
    },

    howWorkMain: {
      key: "how-work-main",
      type: "paper",
      x: 0,
      y: 5020,
      w: 2340,
      h: 1200
    }
  },

  /*
   * CAMERA
   *
   * Deliberately simple.
   *
   * The camera does NOT follow the visible signal.
   *
   * hero      (355,200)
   *             |
   *             |
   * principle (355,650)
   */
  camera: {
    path:
      "M 355 200 " +
      "L 355 696 " +
      "Q 355 730 389 730 " +
      "L 1106 730 " +
      "Q 1140 730 1140 764 " +
      "L 1140 1230",

    stops: {
      hero: {
        x: 355,
        y: 200
      },

      principle: {
        x: 355,
        y: 640
      },

      who: {
        x: 355,
        y: 690
      },

      principles: {
        x: 1160,
        y: 730
      },

      divisions: {
        x: 1140,
        y: 1230
      }
    }
  },

  routes: {
    hub: {
      x: 1140,
      y: 1230
    },
    dataCenter: {
      path: "M 1140 1230 H 1960",
      target: { x: 1960, y: 1260 },
      duration: 1.15,
      ease: "power3.inOut"
    },
    it: {
      path: "M 1140 1230 V 1750",
      target: { x: 1160, y: 1750 },
      duration: 0.90,
      ease: "power3.inOut"
    },
    av: {
      path: "M 1140 1230 H 355",

      /* Intro rests on the lowered AV composition band. */
      target: { x: 355, y: 1340 },
      duration: 1.15,
      ease: "power3.inOut"
    }
  },

  branchJourneys: {
    dataCenter: {
      cameraStart: { x: 1960, y: 1260 },
      cameraEnd: { x: 1960, y: 3790 },
      cameraPath: "M 1960 1260 V 3790",
      cameraStops: [
        { key: "intro", x: 1960, y: 1260 }, { key: "service01", x: 1960, y: 1790 },
        { key: "service02", x: 1960, y: 2190 }, { key: "service03", x: 1960, y: 2590 },
        { key: "service04", x: 1960, y: 2990 }, { key: "service05", x: 1960, y: 3390 },
        { key: "service06", x: 1960, y: 3790 }
      ],
      signals: [
        { key: "dc-service-01", d: "M 1960 1510 V 1643 Q 1960 1655 1972 1655 H 2128 Q 2140 1655 2140 1667 V 1743 Q 2140 1755 2128 1755 H 1972 Q 1960 1755 1960 1767 V 1990", window: { from: 0.04, to: 0.23 } },
        { key: "dc-service-02", d: "M 1960 1990 V 2043 Q 1960 2055 1948 2055 H 1772 Q 1760 2055 1760 2067 V 2143 Q 1760 2155 1772 2155 H 1948 Q 1960 2155 1960 2167 V 2390", window: { from: 0.19, to: 0.39 } },
        { key: "dc-service-03", d: "M 1960 2390 V 2443 Q 1960 2455 1972 2455 H 2128 Q 2140 2455 2140 2467 V 2543 Q 2140 2555 2128 2555 H 1972 Q 1960 2555 1960 2567 V 2790", window: { from: 0.35, to: 0.55 } },
        { key: "dc-service-04", d: "M 1960 2790 V 2843 Q 1960 2855 1948 2855 H 1772 Q 1760 2855 1760 2867 V 2943 Q 1760 2955 1772 2955 H 1948 Q 1960 2955 1960 2967 V 3190", window: { from: 0.51, to: 0.71 } },
        { key: "dc-service-05", d: "M 1960 3190 V 3243 Q 1960 3255 1972 3255 H 2128 Q 2140 3255 2140 3267 V 3343 Q 2140 3355 2128 3355 H 1972 Q 1960 3355 1960 3367 V 3590", window: { from: 0.67, to: 0.87 } },
        { key: "dc-service-06", d: "M 1960 3590 V 3643 Q 1960 3655 1948 3655 H 1772 Q 1760 3655 1760 3667 V 3743 Q 1760 3755 1772 3755 H 1948 Q 1960 3755 1960 3767 V 3990", window: { from: 0.83, to: 1.00 } }
      ]
    },
    it: {
      cameraStart: { x: 1160, y: 1750 },
      cameraEnd: { x: 1160, y: 4290 },
      cameraPath: "M 1160 1750 V 4290",
      cameraStops: [
        { key: "intro", x: 1160, y: 1750 },
        { key: "service01", x: 1160, y: 2290 },
        { key: "service02", x: 1160, y: 2690 },
        { key: "service03", x: 1160, y: 3090 },
        { key: "service04", x: 1160, y: 3490 },
        { key: "service05", x: 1160, y: 3890 },
        { key: "service06", x: 1160, y: 4290 }
      ],
      signals: [
        {
          key: "it-services",
          d: "M 1160 2040 V 2143 Q 1160 2155 1172 2155 H 1328 Q 1340 2155 1340 2167 V 2243 Q 1340 2255 1328 2255 H 1172 Q 1160 2255 1160 2267 V 2440 M 1160 2440 V 2543 Q 1160 2555 1148 2555 H 972 Q 960 2555 960 2567 V 2643 Q 960 2655 972 2655 H 1148 Q 1160 2655 1160 2667 V 2840 M 1160 2840 V 2943 Q 1160 2955 1172 2955 H 1328 Q 1340 2955 1340 2967 V 3043 Q 1340 3055 1328 3055 H 1172 Q 1160 3055 1160 3067 V 3240 M 1160 3240 V 3343 Q 1160 3355 1148 3355 H 972 Q 960 3355 960 3367 V 3443 Q 960 3455 972 3455 H 1148 Q 1160 3455 1160 3467 V 3640 M 1160 3640 V 3743 Q 1160 3755 1172 3755 H 1328 Q 1340 3755 1340 3767 V 3843 Q 1340 3855 1328 3855 H 1172 Q 1160 3855 1160 3867 V 4040 M 1160 4040 V 4143 Q 1160 4155 1148 4155 H 972 Q 960 4155 960 4167 V 4243 Q 960 4255 972 4255 H 1148 Q 1160 4255 1160 4267 V 4440",
          window: { from: 0, to: 1 }
        }
      ]
    },
    av: {
      /*
       * cameraStart stays 1260: it is the progress ORIGIN and clamp
       * floor for the six downstream AV service reveal windows.
       * Changing it would reshift the whole service tower.
       *
       * introStop is the resting camera for the AV intro only.
       */
      cameraStart: { x: 355, y: 1260 },
      introStop: { x: 355, y: 1340 },
      cameraEnd: { x: 355, y: 3790 },
      cameraPath: "M 355 1260 V 3790",
      cameraStops: [
        { key: "intro", x: 355, y: 1260 },
        { key: "overview", x: 355, y: 1710 },
        { key: "service01", x: 355, y: 2060 },
        { key: "service02", x: 355, y: 2380 },
        { key: "service03", x: 355, y: 2700 },
        { key: "service04", x: 355, y: 3020 },
        { key: "service05", x: 355, y: 3340 },
        { key: "service06", x: 355, y: 3660 }
      ],
      contentReveals: [
        { key: "overview", from: 0.10 },
        { key: "service01", from: 0.26 },
        { key: "service02", from: 0.39 },
        { key: "service03", from: 0.52 },
        { key: "service04", from: 0.65 },
        { key: "service05", from: 0.78 },
        { key: "service06", from: 0.91 }
      ],
      signals: [
        { key: "continuous", d: "M 355 1510 V 1900 V 1948 Q 355 1972 331 1972 H 76 Q 52 1972 52 1996 V 2124 Q 52 2148 76 2148 H 331 Q 355 2148 355 2172 V 2220 V 2268 Q 355 2292 379 2292 H 634 Q 658 2292 658 2316 V 2444 Q 658 2468 634 2468 H 379 Q 355 2468 355 2492 V 2540 V 2588 Q 355 2612 331 2612 H 76 Q 52 2612 52 2636 V 2764 Q 52 2788 76 2788 H 331 Q 355 2788 355 2812 V 2860 V 2908 Q 355 2932 379 2932 H 634 Q 658 2932 658 2956 V 3084 Q 658 3108 634 3108 H 379 Q 355 3108 355 3132 V 3180 V 3228 Q 355 3252 331 3252 H 76 Q 52 3252 52 3276 V 3404 Q 52 3428 76 3428 H 331 Q 355 3428 355 3452 V 3500 V 3548 Q 355 3572 379 3572 H 634 Q 658 3572 658 3596 V 3724 Q 658 3748 634 3748 H 379 Q 355 3748 355 3772 V 3990" }
      ]
    },
    howWork: {
      cameraStart: { x: 1160, y: 4840 },
      cameraEnd: { x: 960, y: 5870 },
      entryToQualificationPath: "M 1160 4840 V 5290",
      cameraPath: "M 1160 4840 V 5290 Q 1160 5305 1175 5305 H 1918 Q 1960 5305 1960 5347 V 5828 Q 1960 5870 1918 5870 H 960",
      continuousCameraPath: "M 1160 5290 Q 1160 5305 1175 5305 H 1918 Q 1960 5305 1960 5347 V 5828 Q 1960 5870 1918 5870 H 960",
      cameraStops: [
        { key: "entry", x: 1160, y: 4840 },
        { key: "qualification", x: 1160, y: 5290 },
        { key: "mobilization", x: 1450, y: 5305 },
        { key: "readiness", x: 1910, y: 5305 },
        { key: "execution", x: 1960, y: 5750 },
        { key: "validation", x: 1460, y: 5870 },
        { key: "handover", x: 960, y: 5870 }
      ],
      stageTransitions: [
        { path: "M 1160 5290 Q 1160 5305 1175 5305 H 1450", duration: 0.85 },
        { path: "M 1450 5305 H 1910", duration: 1.05 },
        { path: "M 1910 5305 H 1918 Q 1960 5305 1960 5347 V 5750", duration: 1.10 },
        { path: "M 1960 5750 V 5828 Q 1960 5870 1918 5870 H 1460", duration: 1.20 },
        { path: "M 1460 5870 H 960", duration: 1.10 }
      ],
      stageSignalFractions: [
        0.059728182,
        0.196567057,
        0.399118196,
        0.600881636,
        0.862369098,
        1.000000000
      ],
      continuousSignal: {
        key: "how-signal-continuous",
        d: "M 1160 5220 V 5358 Q 1160 5400 1202 5400 H 1918 Q 1960 5400 1960 5442 V 5918 Q 1960 5960 1918 5960 H 1142",
        windows: [
          { from: 0.02, to: 0.20 },
          { from: 0.20, to: 0.34 },
          { from: 0.34, to: 0.49 },
          { from: 0.49, to: 0.67 },
          { from: 0.67, to: 0.86 },
          { from: 0.86, to: 1.00 }
        ],
        distanceAnchors: [
          { progress: 0.02, fraction: 0.000000000 },
          { progress: 0.20, fraction: 0.089235384 },
          { progress: 0.34, fraction: 0.218213606 },
          { progress: 0.49, fraction: 0.428636582 },
          { progress: 0.67, fraction: 0.596567960 },
          { progress: 0.86, fraction: 0.845078464 },
          { progress: 0.96, fraction: 1.000000000 },
          { progress: 1.00, fraction: 1.000000000 }
        ]
      },
      continuation: { x: 1142, y: 5960 }
    }
  },

  howEntry: {
    target: { x: 1160, y: 4840 },
    trunk: {
      key: "how-entry-trunk",
      d: "M 1160 4950 L 1160 5220",
      revealDuration: 0.50
    },
    sources: {
      dataCenter: {
        key: "dc-to-how",
        cameraPath: "M 1960 3790 V 4798 Q 1960 4840 1918 4840 H 1160",
        cameraDuration: 1.65,
        signalPath: "M 1960 3990 V 4798 Q 1960 4840 1918 4840 H 1202 Q 1160 4840 1160 4882 V 4950",
        revealDuration: 1.35
      },
      it: {
        key: "it-to-how",
        cameraPath: "M 1160 4290 L 1160 4840",
        cameraDuration: 0.85,
        signalPath: "M 1160 4440 V 4950",
        revealDuration: 0.60
      },
      av: {
        key: "av-to-how",
        cameraPath: "M 355 3790 V 4798 Q 355 4840 397 4840 H 1160",
        cameraDuration: 1.55,
        signalPath: "M 355 3990 V 4798 Q 355 4840 397 4840 H 1118 Q 1160 4840 1160 4882 V 4950",
        revealDuration: 1.25
      }
    },
    cameraEase: "power3.inOut",
    signalEase: "power2.inOut"
  },

  routeSignals: {
    dataCenter: {
      key: "route-dc",
      d: "M 1410 1300 V 1428 Q 1410 1440 1422 1440 H 1948 Q 1960 1440 1960 1452 V 1510",
      start: { x: 1410, y: 1300 },
      end: { x: 1960, y: 1510 },
      revealDuration: 0.90
    },
    it: {
      key: "route-it",
      d: "M 1160 1300 V 2040",
      start: { x: 1160, y: 1300 },
      end: { x: 1160, y: 2040 },
      revealDuration: 0.78
    },
    av: {
      key: "route-av",

      /*
       * AV route-only continuation THROUGH the AV hub card.
       * Card rect (800,1248) 190x140 -> top-centre seam (895,1248),
       * bottom-centre emergence (895,1388).
       *
       * The card sits above the signal in z-order, so this run is
       * occluded rather than geometrically broken.
       */
      cardThrough: "M 895 1248 V 1388",

      /*
       * Cardinal-only route. Corner radius 12u.
       * Emerges (895,1388) -> down -> turn right at y=1450 ->
       * horizontal travel -> turn down on x=355 -> ends (355,1510).
       *
       * (355,1450) is the visual contact point with the AV intro,
       * whose copy right edge is also x=355.
       *
       * (355,1510) is the exact start of the continuous AV service signal
       * signal. Seam departure is 0.
       */
      d: "M 895 1388 V 1438 Q 895 1450 883 1450 H 367 Q 355 1450 355 1462 V 1510",
      start: { x: 895, y: 1248 },
      end: { x: 355, y: 1510 },
      revealDuration: 0.90
    },
    retractDuration: 0.58,
    ease: "power2.inOut"
  },

  /*
   * VISIBLE SIGNAL
   *
   * All geometry below is WORLD-SPACE.
   *
   * It is intentionally independent from the camera path.
   */
  signal: {
    pieces: [
      {
        key: "principle-trunk",

        /* About piece 1 — text interaction. */
        d: "M 94 450 V 512 Q 94 524 106 524 H 430 Q 442 524 442 536 V 788",

        start: {
          x: 94,
          y: 450
        },

        end: {
          x: 442,
          y: 788
        },

        window: {
          mode: "arc",
          from: 0.146789,
          to: 0.269656
        }
      },

      {
        key: "about-who",

        d: "M 442 788 Q 442 800 454 800 H 760 Q 772 800 772 788",

        start: {
          x: 442,
          y: 788
        },

        end: {
          x: 772,
          y: 788
        },

        window: {
          mode: "arc",
          from: 0.269656,
          to: 0.345000
        }
      },

      {
        key: "about-who-rise",

        d: "M 772 788 V 642 Q 772 630 784 630 H 1128",

        start: {
          x: 772,
          y: 788
        },

        end: {
          x: 1128,
          y: 630
        },

        window: {
          mode: "arc",
          from: 0.345000,
          to: 0.605018
        }
      },

      {
        key: "about-principles",

        d: "M 1128 630 Q 1140 630 1140 642 V 788 Q 1140 800 1152 800 H 1388",

        start: {
          x: 1128,
          y: 630
        },

        end: {
          x: 1388,
          y: 800
        },

        window: {
          mode: "arc",
          from: 0.605018,
          to: 0.726022
        }
      },

      {
        key: "about-exit",
        d: "M 1388 800 Q 1400 800 1400 812 V 938 Q 1400 950 1388 950 H 1152 Q 1140 950 1140 962",

        start: {
          x: 1388,
          y: 800
        },

        end: {
          x: 1140,
          y: 962
        },

        window: {
          mode: "arc",
          from: 0.749916,
          to: 0.869521
        }
      },

      {
        key: "divisions-feed",

        /*
         * Solutions trunk.
         *
         * Continuous vertical run from the locked About seam (1140,962)
         * to the split point (1140,1230).
         *
         * It passes BEHIND the centred Solutions intro through z-order only.
         * The geometry is never cut.
         */
        d: "M 1140 962 V 1230",

        start: {
          x: 1140,
          y: 962
        },

        end: {
          x: 1140,
          y: 1230
        },

        window: {
          mode: "arc",
          from: 0.869521,
          to: 0.945
        }
      },

      {
        key: "division-dc",

        /* Split (1140,1230) -> DATA card top-centre seam (1385,1248). */
        d: "M 1140 1230 H 1373 Q 1385 1230 1385 1242 V 1248",

        start: {
          x: 1140,
          y: 1230
        },

        end: {
          x: 1385,
          y: 1248
        },

        window: {
          mode: "arc",
          from: 0.956,
          to: 0.989
        }
      },

      {
        key: "division-it",

        /* Split (1140,1230) -> IT card top-centre seam (1140,1248). */
        d: "M 1140 1230 V 1248",

        start: {
          x: 1140,
          y: 1230
        },

        end: {
          x: 1140,
          y: 1248
        },

        window: {
          mode: "arc",
          from: 0.954,
          to: 0.987
        }
      },

      {
        key: "division-av",

        /* Split (1140,1230) -> AV card top-centre seam (895,1248). */
        d: "M 1140 1230 H 907 Q 895 1230 895 1242 V 1248",

        start: {
          x: 1140,
          y: 1230
        },

        end: {
          x: 895,
          y: 1248
        },

        window: {
          mode: "arc",
          from: 0.952,
          to: 0.985
        }
      }
    ],

    seams: [
      {
        from: "principle-trunk",
        to: "about-who",

        point: {
          x: 442,
          y: 788
        },

        departure: 0
      },

      {
        from: "about-who",
        to: "about-who-rise",

        point: {
          x: 772,
          y: 788
        },

        departure: 0
      },

      {
        from: "about-who-rise",
        to: "about-principles",

        point: {
          x: 1128,
          y: 630
        },

        departure: 0
      },

      {
        from: "about-principles",
        to: "about-exit",

        point: {
          x: 1388,
          y: 800
        },

        departure: 0
      },

      {
        from: "about-exit",
        to: "divisions-feed",

        point: {
          x: 1140,
          y: 962
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-dc",

        point: {
          x: 1140,
          y: 1230
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-it",

        point: {
          x: 1140,
          y: 1230
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-av",

        point: {
          x: 1140,
          y: 1230
        },

        departure: 0
      }
    ],

    divisionContinuations: {
      av: {
        x: 895,
        y: 1248,
        direction: "left"
      },
      it: {
        x: 1140,
        y: 1248,
        direction: "down"
      },
      dataCenter: {
        x: 1385,
        y: 1248,
        direction: "right"
      }
    }
  },

  /*
   * Ground / header transition.
   *
   * The second chapter is the light Spaces chapter.
   */
  groundZones: [
    {
      chapter: "c02",
      className: "on-paper",

      x0: 0,
      y0: 450,
      x1: 1540,
      y1: 962
    },
    {
      chapter: "how-work-main",
      className: "on-paper",
      x0: 0,
      y0: 5091,
      x1: 2340,
      y1: 6280
    }
  ]
};
