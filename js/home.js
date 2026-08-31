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
    h: 7580
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

    c05: {
      key: "c05",
      type: "dark",
      x: 740,
      y: 1020,
      w: 800,
      h: 500,

      cameraStop: {
        x: 1160,
        y: 1260
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
      cameraStop: { x: 355, y: 1260 }
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
      cameraStop: { x: 1160, y: 4780 }
    },

    howWorkMain: {
      key: "how-work-main",
      type: "paper",
      x: 0,
      y: 5020,
      w: 2340,
      h: 1200
    },

    whySpaces: {
      key: "why-spaces",
      type: "dark",
      x: 0,
      y: 6220,
      w: 2340,
      h: 1000
    },

    finalCta: {
      key: "final-cta",
      type: "dark",
      x: 0,
      y: 7220,
      w: 2340,
      h: 360
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
      "L 1126 730 " +
      "Q 1160 730 1160 764 " +
      "L 1160 1260",

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
        x: 1160,
        y: 1260
      }
    }
  },

  routes: {
    hub: {
      x: 1160,
      y: 1260
    },
    dataCenter: {
      path: "M 1160 1260 H 1960",
      target: { x: 1960, y: 1260 },
      duration: 1.15,
      ease: "power3.inOut"
    },
    it: {
      path: "M 1160 1260 V 1750",
      target: { x: 1160, y: 1750 },
      duration: 0.90,
      ease: "power3.inOut"
    },
    av: {
      path: "M 1160 1260 H 355",
      target: { x: 355, y: 1260 },
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
      cameraStart: { x: 355, y: 1260 },
      cameraEnd: { x: 355, y: 3790 },
      cameraPath: "M 355 1260 V 3790",
      cameraStops: [
        { key: "intro", x: 355, y: 1260 }, { key: "service01", x: 355, y: 1790 },
        { key: "service02", x: 355, y: 2190 }, { key: "service03", x: 355, y: 2590 },
        { key: "service04", x: 355, y: 2990 }, { key: "service05", x: 355, y: 3390 },
        { key: "service06", x: 355, y: 3790 }
      ],
      signals: [
        { key: "av-service-01", d: "M 355 1510 V 1643 Q 355 1655 367 1655 H 528 Q 540 1655 540 1667 V 1743 Q 540 1755 528 1755 H 367 Q 355 1755 355 1767 V 1990", window: { from: 0.04, to: 0.22 } },
        { key: "av-service-02", d: "M 355 1990 V 2043 Q 355 2055 343 2055 H 212 Q 200 2055 200 2067 V 2143 Q 200 2155 212 2155 H 343 Q 355 2155 355 2167 V 2390", window: { from: 0.18, to: 0.38 } },
        { key: "av-service-03", d: "M 355 2390 V 2443 Q 355 2455 367 2455 H 528 Q 540 2455 540 2467 V 2543 Q 540 2555 528 2555 H 367 Q 355 2555 355 2567 V 2790", window: { from: 0.34, to: 0.54 } },
        { key: "av-service-04", d: "M 355 2790 V 2843 Q 355 2855 343 2855 H 212 Q 200 2855 200 2867 V 2943 Q 200 2955 212 2955 H 343 Q 355 2955 355 2967 V 3190", window: { from: 0.50, to: 0.70 } },
        { key: "av-service-05", d: "M 355 3190 V 3243 Q 355 3255 367 3255 H 528 Q 540 3255 540 3267 V 3343 Q 540 3355 528 3355 H 367 Q 355 3355 355 3367 V 3590", window: { from: 0.66, to: 0.86 } },
        { key: "av-service-06", d: "M 355 3590 V 3643 Q 355 3655 343 3655 H 212 Q 200 3655 200 3667 V 3743 Q 200 3755 212 3755 H 343 Q 355 3755 355 3767 V 3990", window: { from: 0.82, to: 1.00 } }
      ]
    },
    howWork: {
      cameraStart: { x: 1160, y: 4840 },
      cameraEnd: { x: 960, y: 5870 },
      cameraPath: "M 1160 4840 L 1160 5263 Q 1160 5305 1202 5305 L 1918 5305 Q 1960 5305 1960 5347 L 1960 5828 Q 1960 5870 1918 5870 L 960 5870",
      cameraStops: [
        { key: "entry", x: 1160, y: 4840 },
        { key: "qualification", x: 1160, y: 5290 },
        { key: "mobilization", x: 1450, y: 5305 },
        { key: "readiness", x: 1910, y: 5305 },
        { key: "execution", x: 1960, y: 5750 },
        { key: "validation", x: 1460, y: 5870 },
        { key: "handover", x: 960, y: 5870 }
      ],
      continuousSignal: {
        key: "how-signal-continuous",
        d: "M 1160 5220 L 1160 5545 C 1235 5545 1300 5570 1370 5600 C 1405 5615 1440 5615 1480 5598 C 1580 5578 1680 5578 1760 5598 C 1815 5612 1860 5610 1910 5595 C 1960 5595 2000 5625 2020 5670 C 2040 5720 2040 5950 2020 6000 C 2005 6040 1985 6060 1960 6070 C 1860 6060 1760 6075 1680 6100 C 1600 6125 1530 6170 1460 6210 C 1360 6190 1270 6190 1200 6210 C 1145 6225 1110 6250 1100 6285 L 1100 6370",
        windows: [
          { from: 0.02, to: 0.20 },
          { from: 0.20, to: 0.34 },
          { from: 0.34, to: 0.49 },
          { from: 0.49, to: 0.67 },
          { from: 0.67, to: 0.86 },
          { from: 0.86, to: 1.00 }
        ]
      },
      signals: [
        { key: "how-stage-01", d: "M 1160 5220 L 1160 5545", window: { from: 0.02, to: 0.20 } },
        { key: "how-stage-02", d: "M 1160 5545 C 1235 5545 1300 5570 1370 5600 C 1405 5615 1440 5615 1480 5598", window: { from: 0.17, to: 0.34 } },
        { key: "how-stage-03", d: "M 1480 5598 C 1580 5578 1680 5578 1760 5598 C 1815 5612 1860 5610 1910 5595", window: { from: 0.30, to: 0.49 } },
        { key: "how-stage-04", d: "M 1910 5595 C 1960 5595 2000 5625 2020 5670 C 2040 5720 2040 5950 2020 6000 C 2005 6040 1985 6060 1960 6070", window: { from: 0.45, to: 0.67 } },
        { key: "how-stage-05", d: "M 1960 6070 C 1860 6060 1760 6075 1680 6100 C 1600 6125 1530 6170 1460 6210", window: { from: 0.63, to: 0.86 } },
        { key: "how-stage-06", d: "M 1460 6210 C 1360 6190 1270 6190 1200 6210 C 1145 6225 1110 6250 1100 6285 L 1100 6370", window: { from: 0.80, to: 1.00 } }
      ],
      continuation: { x: 1100, y: 6180 }
    },
    whySpaces: {
      cameraStart: { x: 960, y: 5870 },
      cameraEnd: { x: 1160, y: 6970 },
      cameraPath: "M 960 5870 L 960 6313 Q 960 6355 1002 6355 L 1160 6355 L 1160 6970",
      cameraStops: [
        { key: "entry", x: 960, y: 5870 },
        { key: "intro", x: 1160, y: 6455 },
        { key: "proof", x: 1160, y: 6755 },
        { key: "exit", x: 1160, y: 6970 }
      ],
      signal: {
        key: "why-signal-continuous",
        d: "M 1100 6370 L 1100 6600 C 1100 6640 1135 6660 1180 6660 C 1220 6660 1240 6690 1240 6720 C 1240 6750 1215 6775 1170 6790 C 1135 6802 1120 6825 1120 6855 C 1120 6885 1145 6905 1190 6915 C 1235 6925 1260 6950 1260 6980 C 1260 7010 1235 7030 1190 7040 C 1145 7050 1120 7075 1120 7105 C 1120 7135 1145 7155 1190 7165 C 1235 7175 1250 7200 1230 7225 C 1215 7245 1185 7260 1160 7280 L 1160 7420",
        start: { x: 1100, y: 6180 },
        end: { x: 1160, y: 7230 }
      },
      continuation: { x: 1160, y: 7230 }
    },
    finalCta: {
      cameraStart: { x: 1160, y: 6970 },
      cameraEnd: { x: 1160, y: 7440 },
      cameraPath: "M 1160 6970 L 1160 7440",
      cameraStops: [
        { key: "entry", x: 1160, y: 6970 },
        { key: "cta", x: 1160, y: 7440 }
      ],
      signal: {
        key: "cta-signal-continuous",
        d: "M 1160 7420 L 1160 7460 C 1160 7482 1175 7500 1200 7510",
        start: { x: 1160, y: 7230 },
        end: { x: 1200, y: 7320 }
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
      d: "M 910 1300 V 1428 Q 910 1440 898 1440 H 367 Q 355 1440 355 1452 V 1510",
      start: { x: 910, y: 1300 },
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
        d: "M 1140 962 V 1068 Q 1140 1080 1128 1080 H 888 Q 876 1080 876 1092 V 1230 Q 876 1242 888 1242 H 1160",

        start: {
          x: 1140,
          y: 962
        },

        end: {
          x: 1160,
          y: 1242
        },

        window: {
          mode: "arc",
          from: 0.869521,
          to: 0.945
        }
      },

      {
        key: "division-dc",
        d: "M 1160 1242 H 1398 Q 1410 1242 1410 1254 V 1300",

        start: {
          x: 1160,
          y: 1242
        },

        end: {
          x: 1410,
          y: 1300
        },

        window: {
          mode: "arc",
          from: 0.956,
          to: 0.989
        }
      },

      {
        key: "division-it",
        d: "M 1160 1242 V 1300",

        start: {
          x: 1160,
          y: 1242
        },

        end: {
          x: 1160,
          y: 1300
        },

        window: {
          mode: "arc",
          from: 0.954,
          to: 0.987
        }
      },

      {
        key: "division-av",
        d: "M 1160 1242 H 922 Q 910 1242 910 1254 V 1300",

        start: {
          x: 1160,
          y: 1242
        },

        end: {
          x: 910,
          y: 1300
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
          x: 1160,
          y: 1242
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-it",

        point: {
          x: 1160,
          y: 1242
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-av",

        point: {
          x: 1160,
          y: 1242
        },

        departure: 0
      }
    ],

    divisionContinuations: {
      dataCenter: {
        x: 910,
          y: 1300,
        direction: "left"
      },
      it: {
        x: 1160,
          y: 1300,
        direction: "down"
      },
      av: {
        x: 1410,
          y: 1300,
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
      y0: 5140,
      x1: 2340,
      y1: 6280
    }
  ]
};
