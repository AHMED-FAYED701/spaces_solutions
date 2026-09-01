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
    h: 7520
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
      cameraStop: { x: 1940, y: 1340 }
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
      cameraStop: { x: 1140, y: 1840 }
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
    },

    /*
     * CHAPTER — WHY SPACES SOLUTIONS
     *
     * World x 780 -> 1504, y 6000 -> 7040.
     *
     * The origin deliberately overlaps how-work-main (which ends at 6220)
     * so the light ground is continuous: there is no seam at Handover.
     */
    whySpaces: {
      key: "why-spaces",
      type: "paper",
      x: 780,
      y: 6000,
      w: 724,
      h: 1040
    },

    /*
     * CHAPTER — CONTACT
     *
     * World x 780 -> 1504, y 7000 -> 7520.
     *
     * Overlaps Why (which ends at 7040) so the light->dark field
     * transition has both chapters underneath it.
     */
    contact: {
      key: "contact",
      type: "dark",
      x: 780,
      y: 7000,
      w: 724,
      h: 520
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
      path: "M 1140 1230 H 1940",
      target: { x: 1940, y: 1340 },
      duration: 1.15,
      ease: "power3.inOut"
    },
    it: {
      path: "M 1140 1230 V 1840",
      target: { x: 1140, y: 1840 },
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
      cameraStart: { x: 1940, y: 1260 },
      introStop: { x: 1940, y: 1340 },
      cameraEnd: { x: 1940, y: 3790 },
      cameraPath: "M 1940 1260 V 3790",
      cameraStops: [
        { key: "intro", x: 1940, y: 1260 },
        { key: "overview", x: 1940, y: 1710 },
        { key: "service01", x: 1940, y: 2060 },
        { key: "service02", x: 1940, y: 2380 },
        { key: "service03", x: 1940, y: 2700 },
        { key: "service04", x: 1940, y: 3020 },
        { key: "service05", x: 1940, y: 3340 },
        { key: "service06", x: 1940, y: 3660 }
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
        { key: "continuous", d: "M 1940 1510 V 1900 V 1948 Q 1940 1972 1916 1972 H 1661 Q 1637 1972 1637 1996 V 2124 Q 1637 2148 1661 2148 H 1916 Q 1940 2148 1940 2172 V 2220 V 2268 Q 1940 2292 1964 2292 H 2219 Q 2243 2292 2243 2316 V 2444 Q 2243 2468 2219 2468 H 1964 Q 1940 2468 1940 2492 V 2540 V 2588 Q 1940 2612 1916 2612 H 1661 Q 1637 2612 1637 2636 V 2764 Q 1637 2788 1661 2788 H 1916 Q 1940 2788 1940 2812 V 2860 V 2908 Q 1940 2932 1964 2932 H 2219 Q 2243 2932 2243 2956 V 3084 Q 2243 3108 2219 3108 H 1964 Q 1940 3108 1940 3132 V 3180 V 3228 Q 1940 3252 1916 3252 H 1661 Q 1637 3252 1637 3276 V 3404 Q 1637 3428 1661 3428 H 1916 Q 1940 3428 1940 3452 V 3500 V 3548 Q 1940 3572 1964 3572 H 2219 Q 2243 3572 2243 3596 V 3724 Q 2243 3748 2219 3748 H 1964 Q 1940 3748 1940 3772 V 3990" }
      ]
    },
    it: {
      cameraStart: { x: 1140, y: 1760 },
      introStop: { x: 1140, y: 1840 },
      cameraEnd: { x: 1140, y: 4290 },
      cameraPath: "M 1140 1760 V 4290",
      cameraStops: [
        { key: "intro", x: 1140, y: 1760 },
        { key: "overview", x: 1140, y: 2210 },
        { key: "service01", x: 1140, y: 2560 },
        { key: "service02", x: 1140, y: 2880 },
        { key: "service03", x: 1140, y: 3200 },
        { key: "service04", x: 1140, y: 3520 },
        { key: "service05", x: 1140, y: 3840 },
        { key: "service06", x: 1140, y: 4160 }
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
        {
          key: "continuous",
          d: "M 1140 2010 V 2400 V 2448 Q 1140 2472 1116 2472 H 861 Q 837 2472 837 2496 V 2624 Q 837 2648 861 2648 H 1116 Q 1140 2648 1140 2672 V 2720 V 2768 Q 1140 2792 1164 2792 H 1419 Q 1443 2792 1443 2816 V 2944 Q 1443 2968 1419 2968 H 1164 Q 1140 2968 1140 2992 V 3040 V 3088 Q 1140 3112 1116 3112 H 861 Q 837 3112 837 3136 V 3264 Q 837 3288 861 3288 H 1116 Q 1140 3288 1140 3312 V 3360 V 3408 Q 1140 3432 1164 3432 H 1419 Q 1443 3432 1443 3456 V 3584 Q 1443 3608 1419 3608 H 1164 Q 1140 3608 1140 3632 V 3680 V 3728 Q 1140 3752 1116 3752 H 861 Q 837 3752 837 3776 V 3904 Q 837 3928 861 3928 H 1116 Q 1140 3928 1140 3952 V 4000 V 4048 Q 1140 4072 1164 4072 H 1419 Q 1443 4072 1443 4096 V 4224 Q 1443 4248 1419 4248 H 1184 Q 1160 4248 1160 4272 V 4490"
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
      /*
       * ONE continuous camera route.
       *
       * Qualification (1160,5290) -> Handover (960,5870) preserves the
       * approved How route. After Handover the camera continues straight
       * down at x=960; the downstream signal travels left to meet that axis.
       *
       * Authored total ~3682.699u. Runtime truth: getTotalLength().
       */
      continuousCameraPath:
        "M 1160 5290 " +
        "Q 1160 5305 1175 5305 " +
        "H 1918 " +
        "Q 1960 5305 1960 5347 " +
        "V 5828 " +
        "Q 1960 5870 1918 5870 " +
        "H 960 " +
        "V 7210",
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
      continuation: { x: 1142, y: 5960 },

      /*
       * DOWNSTREAM — WHY + CONTACT
       *
       * Continuous reference anchors, NOT snap stops. Their cumulative
       * camera distances are derived mechanically at runtime from the live
       * continuousCameraPath; the values in the comment are the authored
       * expectations used for validation only.
       *
       * handover   2342.699   whyIntro 2607.699   reason01 2758.699
       * reason02   2918.699   reason03 3078.699   reason04 3238.699
       * whyExit    3412.699   contact 3682.699
       */
      downstream: {
        cameraAnchors: [
          { key: "handover", x: 960, y: 5870 },
          { key: "whyIntro", x: 960, y: 6135 },
          { key: "reason01", x: 960, y: 6286 },
          { key: "reason02", x: 960, y: 6446 },
          { key: "reason03", x: 960, y: 6606 },
          { key: "reason04", x: 960, y: 6766 },
          { key: "whyExit", x: 960, y: 6940 },
          { key: "contact", x: 960, y: 7210 }
        ],

        /*
         * Why/Contact signal — ONE piece, starting exactly at the existing
         * How endpoint (1142,5960) so the seam departure is 0u.
         *
         * Cardinal runs only, rounded corners, no diagonal, no wave.
         * Authored length ~1910.787u including the 182u seam-to-axis run.
         */
        signal: {
          key: "why-signal-continuous",
          d:
            "M 1142 5960 " +
            "H 960 " +
            "V 6198 Q 960 6210 948 6210 " +
            "H 915 Q 903 6210 903 6222 " +
            "V 6358 Q 903 6370 915 6370 " +
            "H 1001 Q 1013 6370 1013 6382 " +
            "V 6518 Q 1013 6530 1025 6530 " +
            "H 1031 Q 1043 6530 1043 6542 " +
            "V 6678 Q 1043 6690 1031 6690 " +
            "H 915 Q 903 6690 903 6702 " +
            "V 6838 Q 903 6850 915 6850 " +
            "H 948 Q 960 6850 960 6862 " +
            "V 7340",
          start: { x: 1142, y: 5960 },
          end: { x: 960, y: 7340 },

          /*
           * Piecewise-linear reveal fraction per camera anchor above.
           * The signal is 0 at Handover and reveals immediately afterward.
           */
          fractions: [
            0.0000000000,
            0.2198047159,
            0.3139844455,
            0.4505550847,
            0.5452581589,
            0.6975291348,
            0.7498412995,
            1.0000000000
          ]
        }
      }
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
        cameraPath: "M 1940 3790 V 4798 Q 1940 4840 1898 4840 H 1160",
        cameraDuration: 1.55,
        signalPath: "M 1940 3990 V 4798 Q 1940 4840 1898 4840 H 1202 Q 1160 4840 1160 4882 V 4950",
        revealDuration: 1.25
      },
      it: {
        key: "it-to-how",
        cameraPath: "M 1140 4290 V 4472 Q 1140 4480 1148 4480 H 1152 Q 1160 4480 1160 4488 V 4840",
        cameraDuration: 0.85,
        signalPath: "M 1160 4490 V 4950",
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
      cardThrough: "M 1385 1248 V 1388",
      d: "M 1385 1388 V 1438 Q 1385 1450 1397 1450 H 1928 Q 1940 1450 1940 1462 V 1510",
      start: { x: 1385, y: 1248 },
      end: { x: 1940, y: 1510 },
      revealDuration: 0.90
    },
    it: {
      key: "route-it",
      cardThrough: "M 1140 1248 V 1388",
      d: "M 1140 1388 V 2010",
      start: { x: 1140, y: 1248 },
      end: { x: 1140, y: 2010 },
      revealDuration: 0.90
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
      /*
       * The light header persists from How through Why and into the
       * Why->Contact transition. y1 is the camera y at local Reason04->
       * Contact progress s=0.56 (6766 + 0.56 * 444), the ordered dark
       * header switch point. Reversing crosses the same line.
       */
      chapter: "how-work-main",
      className: "on-paper",
      x0: 0,
      y0: 5091,
      x1: 2340,
      y1: 7014.64
    }
  ]
};
