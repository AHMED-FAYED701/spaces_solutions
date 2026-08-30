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
      h: 570,

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
      h: 570,

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
      x: 0,
      y: 1020,
      w: 740,
      h: 500,
      cameraStop: { x: 355, y: 1280 }
    },

    dcServices: {
      key: "dc-services",
      type: "dark",
      x: 0,
      y: 1520,
      w: 740,
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
      x: 1540,
      y: 1020,
      w: 800,
      h: 500,
      cameraStop: { x: 1960, y: 1280 }
    },

    avServices: {
      key: "av-services",
      type: "dark",
      x: 1540,
      y: 1520,
      w: 800,
      h: 3000
    },

    c06it: {
      key: "c06-it",
      type: "dark",
      x: 740,
      y: 1520,
      w: 800,
      h: 500,
      cameraStop: { x: 1160, y: 1780 }
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
      path: "M 1160 1320 L 355 1340",
      target: { x: 355, y: 1340 },
      duration: 1.15,
      ease: "power3.inOut"
    },
    it: {
      path: "M 1160 1320 L 1160 1840",
      target: { x: 1160, y: 1840 },
      duration: 0.90,
      ease: "power3.inOut"
    },
    av: {
      path: "M 1160 1320 L 1960 1340",
      target: { x: 1960, y: 1340 },
      duration: 1.15,
      ease: "power3.inOut"
    }
  },

  branchJourneys: {
    dataCenter: {
      cameraStart: { x: 355, y: 1340 },
      cameraEnd: { x: 355, y: 3790 },
      cameraPath: "M 355 1340 L 355 3790",
      cameraStops: [
        { key: "intro", x: 355, y: 1340 },
        { key: "service01", x: 355, y: 1790 },
        { key: "service02", x: 355, y: 2190 },
        { key: "service03", x: 355, y: 2590 },
        { key: "service04", x: 355, y: 2990 },
        { key: "service05", x: 355, y: 3390 },
        { key: "service06", x: 355, y: 3790 }
      ],
      signals: [
        { key: "dc-service-01", d: "M 355 1700 L 355 1815 C 355 1850 390 1870 425 1870 C 448 1870 455 1888 455 1915 L 455 2000 C 455 2030 475 2048 505 2055 C 535 2062 520 2080 485 2095 C 440 2114 380 2135 355 2180", window: { from: 0.04, to: 0.23 } },
        { key: "dc-service-02", d: "M 355 2180 L 355 2215 C 355 2250 325 2270 290 2270 C 267 2270 255 2288 255 2315 L 255 2400 C 255 2430 235 2448 205 2455 C 175 2462 190 2480 225 2495 C 270 2514 330 2535 355 2580", window: { from: 0.19, to: 0.39 } },
        { key: "dc-service-03", d: "M 355 2580 L 355 2615 C 355 2650 390 2670 425 2670 C 448 2670 455 2688 455 2715 L 455 2800 C 455 2830 475 2848 505 2855 C 535 2862 520 2880 485 2895 C 440 2914 380 2935 355 2980", window: { from: 0.35, to: 0.55 } },
        { key: "dc-service-04", d: "M 355 2980 L 355 3015 C 355 3050 325 3070 290 3070 C 267 3070 255 3088 255 3115 L 255 3200 C 255 3230 235 3248 205 3255 C 175 3262 190 3280 225 3295 C 270 3314 330 3335 355 3380", window: { from: 0.51, to: 0.71 } },
        { key: "dc-service-05", d: "M 355 3380 L 355 3415 C 355 3450 390 3470 425 3470 C 448 3470 455 3488 455 3515 L 455 3600 C 455 3630 475 3648 505 3655 C 535 3662 520 3680 485 3695 C 440 3714 380 3735 355 3780", window: { from: 0.67, to: 0.87 } },
        { key: "dc-service-06", d: "M 355 3780 L 355 3815 C 355 3850 325 3870 290 3870 C 267 3870 255 3888 255 3915 L 255 4000 C 255 4030 235 4048 205 4055 C 175 4062 190 4080 225 4095 C 270 4114 330 4135 355 4180", window: { from: 0.83, to: 1.00 } }
      ]
    },
    it: {
      cameraStart: { x: 1160, y: 1840 },
      cameraEnd: { x: 1160, y: 4290 },
      cameraPath: "M 1160 1840 L 1160 4290",
      cameraStops: [
        { key: "intro", x: 1160, y: 1840 },
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
          d:
            "M 1160 2230 C 1160 2280 1190 2325 1230 2350 C 1255 2366 1270 2390 1270 2420 L 1270 2500 C 1270 2530 1295 2550 1325 2560 C 1300 2590 1260 2615 1215 2640 C 1170 2665 1110 2690 1060 2725 " +
            "M 1060 2725 C 1025 2750 1010 2780 1010 2820 L 1010 2900 C 1010 2930 985 2950 955 2960 C 980 2990 1020 3020 1065 3050 C 1110 3080 1175 3110 1230 3145 " +
            "M 1230 3145 C 1260 3170 1270 3200 1270 3235 L 1270 3310 C 1270 3340 1295 3360 1325 3370 C 1300 3400 1260 3425 1215 3450 C 1170 3475 1105 3505 1055 3540 " +
            "M 1055 3540 C 1020 3565 1010 3595 1010 3630 L 1010 3710 C 1010 3740 985 3760 955 3770 C 980 3800 1020 3830 1065 3860 C 1110 3890 1175 3920 1230 3955 " +
            "M 1230 3955 C 1260 3980 1270 4010 1270 4045 L 1270 4120 C 1270 4150 1295 4170 1325 4180 C 1300 4210 1260 4235 1215 4260 C 1170 4285 1105 4315 1055 4350 " +
            "M 1055 4350 C 1020 4375 1010 4405 1010 4440 L 1010 4520 C 1010 4550 985 4570 955 4580 C 985 4610 1040 4630 1095 4645 C 1125 4653 1150 4662 1160 4680",
          window: { from: 0, to: 1 }
        }
      ]
    },
    av: {
      cameraStart: { x: 1960, y: 1340 },
      cameraEnd: { x: 1960, y: 3960 },
      cameraPath: "M 1960 1340 L 1960 3960",
      cameraStops: [
        { key: "intro", x: 1960, y: 1340 },
        { key: "service01", x: 1960, y: 1810 },
        { key: "service02", x: 1960, y: 2240 },
        { key: "service03", x: 1960, y: 2670 },
        { key: "service04", x: 1960, y: 3100 },
        { key: "service05", x: 1960, y: 3530 },
        { key: "service06", x: 1960, y: 3960 }
      ],
      signals: [
        { key: "av-service-01", d: "M 1960 1700 C 1960 1765 2000 1815 2045 1845 C 2075 1865 2085 1895 2085 1930 L 2085 2010 C 2085 2040 2110 2058 2145 2068 C 2178 2077 2165 2102 2125 2125 C 2058 2162 1955 2185 1870 2200", window: { from: 0.04, to: 0.22 } },
        { key: "av-service-02", d: "M 1870 2200 C 1815 2220 1775 2260 1755 2310 C 1740 2340 1735 2370 1735 2410 L 1735 2470 C 1735 2500 1710 2522 1675 2532 C 1643 2541 1657 2566 1700 2588 C 1780 2625 1920 2628 2050 2630", window: { from: 0.18, to: 0.38 } },
        { key: "av-service-03", d: "M 2050 2630 C 2105 2650 2140 2690 2155 2738 C 2165 2768 2165 2795 2165 2825 L 2165 2890 C 2165 2920 2190 2940 2225 2950 C 2258 2960 2240 2987 2195 3012 C 2110 3055 1975 3057 1870 3060", window: { from: 0.34, to: 0.54 } },
        { key: "av-service-04", d: "M 1870 3060 C 1815 3080 1775 3120 1755 3168 C 1740 3198 1735 3225 1735 3255 L 1735 3320 C 1735 3350 1710 3370 1675 3380 C 1642 3390 1660 3417 1705 3442 C 1790 3482 1935 3487 2050 3490", window: { from: 0.50, to: 0.70 } },
        { key: "av-service-05", d: "M 2050 3490 C 2105 3510 2145 3550 2165 3598 C 2180 3628 2185 3655 2185 3685 L 2185 3750 C 2185 3780 2210 3800 2245 3810 C 2278 3820 2260 3847 2215 3872 C 2130 3912 1985 3917 1870 3920", window: { from: 0.66, to: 0.86 } },
        { key: "av-service-06", d: "M 1870 3920 C 1815 3940 1775 3980 1755 4028 C 1740 4058 1735 4085 1735 4115 L 1735 4180 C 1735 4210 1710 4230 1675 4240 C 1645 4250 1660 4278 1710 4305 C 1800 4355 1900 4410 1940 4470 C 1955 4493 1960 4520 1960 4550", window: { from: 0.82, to: 1.00 } }
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
        cameraPath: "M 355 3790 L 355 4798 Q 355 4840 397 4840 L 1160 4840",
        cameraDuration: 1.65,
        signalPath: "M 355 3800 C 370 3830 355 3910 355 4000 L 355 4460 C 355 4500 390 4528 430 4528 L 1118 4528 Q 1160 4528 1160 4570",
        revealDuration: 1.35
      },
      it: {
        key: "it-to-how",
        cameraPath: "M 1160 4290 L 1160 4840",
        cameraDuration: 0.85,
        signalPath: "M 1160 4300 C 1175 4330 1160 4370 1160 4410 L 1160 4570",
        revealDuration: 0.60
      },
      av: {
        key: "av-to-how",
        cameraPath: "M 1960 3960 L 1960 4798 Q 1960 4840 1918 4840 L 1160 4840",
        cameraDuration: 1.55,
        signalPath: "M 1960 4170 L 1960 4460 C 1960 4500 1925 4528 1885 4528 L 1202 4528 Q 1160 4528 1160 4570",
        revealDuration: 1.25
      }
    },
    cameraEase: "power3.inOut",
    signalEase: "power2.inOut"
  },

  routeSignals: {
    dataCenter: {
      key: "route-dc",
      d: "M 910 1360 C 877 1365 820 1358 760 1332 C 720 1315 690 1320 650 1320 L 397 1320 Q 355 1320 355 1362 L 355 1510",
      start: { x: 910, y: 1360 },
      end: { x: 355, y: 1510 },
      revealDuration: 0.90
    },
    it: {
      key: "route-it",
      d: "M 1160 1360 L 1160 2040",
      start: { x: 1160, y: 1360 },
      end: { x: 1160, y: 2040 },
      revealDuration: 0.78
    },
    av: {
      key: "route-av",
      d: "M 1410 1360 C 1443 1365 1500 1358 1560 1332 C 1600 1315 1630 1320 1670 1320 L 1918 1320 Q 1960 1320 1960 1362 L 1960 1510",
      start: { x: 1410, y: 1360 },
      end: { x: 1960, y: 1510 },
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
        d: "M 94 470 V 512 Q 94 524 106 524 H 430 Q 442 524 442 536 V 788",

        start: {
          x: 94,
          y: 470
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
        d: "M 1388 800 Q 1400 800 1400 812 V 938 Q 1400 950 1388 950 H 1152 Q 1140 950 1140 962 V 1020",

        start: {
          x: 1388,
          y: 800
        },

        end: {
          x: 1140,
          y: 1020
        },

        window: {
          mode: "arc",
          from: 0.749916,
          to: 0.869521
        }
      },

      {
        key: "divisions-feed",
        d: "M 1140 1020 V 1225 H 1160",

        start: {
          x: 1140,
          y: 1020
        },

        end: {
          x: 1160,
          y: 1225
        },

        window: {
          mode: "arc",
          from: 0.869521,
          to: 0.980972
        }
      },

      {
        key: "division-dc",
        d:
          "M 1160 1225 " +
          "C 1095 1225 1055 1243 1005 1267 " +
          "C 970 1284 943 1295 910 1300",

        start: {
          x: 1160,
          y: 1225
        },

        end: {
          x: 910,
          y: 1300
        },

        window: {
          mode: "arc",
          from: 0.840,
          to: 0.985
        }
      },

      {
        key: "division-it",
        d: "M 1160 1225 C 1160 1250 1160 1275 1160 1300",

        start: {
          x: 1160,
          y: 1225
        },

        end: {
          x: 1160,
          y: 1300
        },

        window: {
          mode: "arc",
          from: 0.840,
          to: 0.985
        }
      },

      {
        key: "division-av",
        d:
          "M 1160 1225 " +
          "C 1225 1225 1265 1243 1315 1267 " +
          "C 1350 1284 1377 1295 1410 1300",

        start: {
          x: 1160,
          y: 1225
        },

        end: {
          x: 1410,
          y: 1300
        },

        window: {
          mode: "arc",
          from: 0.840,
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
          y: 1020
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-dc",

        point: {
          x: 1160,
          y: 1225
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-it",

        point: {
          x: 1160,
          y: 1225
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-av",

        point: {
          x: 1160,
          y: 1225
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
      y1: 1080
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
