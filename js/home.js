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
    h: 7830
  },

  scroll: {
    holdScreens: 1.0
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

    /*
     * CHAPTER 02 — POSITIONING / PRINCIPLE
     *
     * World:
     * x 0 → 740
     * y 450 → 850
     */
    c02: {
      key: "c02",
      type: "paper",
      x: 0,
      y: 450,
      w: 740,
      h: 400,

      cameraStop: {
        x: 355,
        y: 650
      },

      localCameraCentre: {
        x: 355,
        y: 200
      },

      copy: {
        x: 60,
        y: 115,
        w: 260
      },

      visual: {
        x: 390,
        y: 85,
        w: 290,
        h: 240,
        placeholder: true
      }
    },

    c03: {
      key: "c03",
      type: "paper",
      x: 0,
      y: 850,
      w: 740,
      h: 420,

      cameraStop: {
        x: 355,
        y: 1070
      }
    },

    c04: {
      key: "c04",
      type: "dark",
      x: 740,
      y: 850,
      w: 800,
      h: 420,

      cameraStop: {
        x: 1160,
        y: 1070
      }
    },

    c05: {
      key: "c05",
      type: "dark",
      x: 740,
      y: 1270,
      w: 800,
      h: 500,

      cameraStop: {
        x: 1160,
        y: 1510
      }
    },

    c06dc: {
      key: "c06-dc",
      type: "dark",
      x: 0,
      y: 1270,
      w: 740,
      h: 500,
      cameraStop: { x: 355, y: 1530 }
    },

    dcServices: {
      key: "dc-services",
      type: "dark",
      x: 0,
      y: 1770,
      w: 740,
      h: 2500
    },

    itServices: {
      key: "it-services",
      type: "dark",
      x: 740,
      y: 2270,
      w: 800,
      h: 2610
    },

    c06av: {
      key: "c06-av",
      type: "dark",
      x: 1540,
      y: 1270,
      w: 800,
      h: 500,
      cameraStop: { x: 1960, y: 1530 }
    },

    avServices: {
      key: "av-services",
      type: "dark",
      x: 1540,
      y: 1770,
      w: 800,
      h: 3000
    },

    c06it: {
      key: "c06-it",
      type: "dark",
      x: 740,
      y: 1770,
      w: 800,
      h: 500,
      cameraStop: { x: 1160, y: 2030 }
    },

    howEntry: {
      key: "how-shared-entry",
      type: "dark",
      x: 0,
      y: 4770,
      w: 2340,
      h: 500,
      cameraStop: { x: 1160, y: 5030 }
    },

    howWorkMain: {
      key: "how-work-main",
      type: "paper",
      x: 0,
      y: 5270,
      w: 2340,
      h: 1200
    },

    whySpaces: {
      key: "why-spaces",
      type: "dark",
      x: 0,
      y: 6470,
      w: 2340,
      h: 1000
    },

    finalCta: {
      key: "final-cta",
      type: "dark",
      x: 0,
      y: 7470,
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
      "L 355 1028 " +
      "Q 355 1070 397 1070 " +
      "L 1160 1070 " +
      "L 1160 1510",

    stops: {
      hero: {
        x: 355,
        y: 200
      },

      principle: {
        x: 355,
        y: 650
      },

      who: {
        x: 355,
        y: 1070
      },

      principles: {
        x: 1160,
        y: 1070
      },

      divisions: {
        x: 1160,
        y: 1510
      }
    }
  },

  routes: {
    hub: {
      x: 1160,
      y: 1510
    },
    dataCenter: {
      path: "M 1160 1510 L 355 1530",
      target: { x: 355, y: 1530 },
      duration: 1.15,
      ease: "power3.inOut"
    },
    it: {
      path: "M 1160 1510 L 1160 2030",
      target: { x: 1160, y: 2030 },
      duration: 0.90,
      ease: "power3.inOut"
    },
    av: {
      path: "M 1160 1510 L 1960 1530",
      target: { x: 1960, y: 1530 },
      duration: 1.15,
      ease: "power3.inOut"
    }
  },

  branchJourneys: {
    dataCenter: {
      cameraStart: { x: 355, y: 1530 },
      cameraEnd: { x: 355, y: 3980 },
      cameraPath: "M 355 1530 L 355 3980",
      cameraStops: [
        { key: "intro", x: 355, y: 1530 },
        { key: "service01", x: 355, y: 1980 },
        { key: "service02", x: 355, y: 2380 },
        { key: "service03", x: 355, y: 2780 },
        { key: "service04", x: 355, y: 3180 },
        { key: "service05", x: 355, y: 3580 },
        { key: "service06", x: 355, y: 3980 }
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
      cameraStart: { x: 1160, y: 2030 },
      cameraEnd: { x: 1160, y: 4480 },
      cameraPath: "M 1160 2030 L 1160 4480",
      cameraStops: [
        { key: "intro", x: 1160, y: 2030 },
        { key: "service01", x: 1160, y: 2480 },
        { key: "service02", x: 1160, y: 2880 },
        { key: "service03", x: 1160, y: 3280 },
        { key: "service04", x: 1160, y: 3680 },
        { key: "service05", x: 1160, y: 4080 },
        { key: "service06", x: 1160, y: 4480 }
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
      cameraStart: { x: 1960, y: 1530 },
      cameraEnd: { x: 1960, y: 4150 },
      cameraPath: "M 1960 1530 L 1960 4150",
      cameraStops: [
        { key: "intro", x: 1960, y: 1530 },
        { key: "service01", x: 1960, y: 2000 },
        { key: "service02", x: 1960, y: 2430 },
        { key: "service03", x: 1960, y: 2860 },
        { key: "service04", x: 1960, y: 3290 },
        { key: "service05", x: 1960, y: 3720 },
        { key: "service06", x: 1960, y: 4150 }
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
      cameraStart: { x: 1160, y: 5030 },
      cameraEnd: { x: 960, y: 6060 },
      cameraPath: "M 1160 5030 L 1160 5453 Q 1160 5495 1202 5495 L 1918 5495 Q 1960 5495 1960 5537 L 1960 6018 Q 1960 6060 1918 6060 L 960 6060",
      cameraStops: [
        { key: "entry", x: 1160, y: 5030 },
        { key: "qualification", x: 1160, y: 5480 },
        { key: "mobilization", x: 1450, y: 5495 },
        { key: "readiness", x: 1910, y: 5495 },
        { key: "execution", x: 1960, y: 5940 },
        { key: "validation", x: 1460, y: 6060 },
        { key: "handover", x: 960, y: 6060 }
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
      continuation: { x: 1100, y: 6370 }
    },
    whySpaces: {
      cameraStart: { x: 960, y: 6060 },
      cameraEnd: { x: 1160, y: 7160 },
      cameraPath: "M 960 6060 L 960 6503 Q 960 6545 1002 6545 L 1160 6545 L 1160 7160",
      cameraStops: [
        { key: "entry", x: 960, y: 6060 },
        { key: "intro", x: 1160, y: 6645 },
        { key: "proof", x: 1160, y: 6945 },
        { key: "exit", x: 1160, y: 7160 }
      ],
      signal: {
        key: "why-signal-continuous",
        d: "M 1100 6370 L 1100 6600 C 1100 6640 1135 6660 1180 6660 C 1220 6660 1240 6690 1240 6720 C 1240 6750 1215 6775 1170 6790 C 1135 6802 1120 6825 1120 6855 C 1120 6885 1145 6905 1190 6915 C 1235 6925 1260 6950 1260 6980 C 1260 7010 1235 7030 1190 7040 C 1145 7050 1120 7075 1120 7105 C 1120 7135 1145 7155 1190 7165 C 1235 7175 1250 7200 1230 7225 C 1215 7245 1185 7260 1160 7280 L 1160 7420",
        start: { x: 1100, y: 6370 },
        end: { x: 1160, y: 7420 }
      },
      continuation: { x: 1160, y: 7420 }
    },
    finalCta: {
      cameraStart: { x: 1160, y: 7160 },
      cameraEnd: { x: 1160, y: 7630 },
      cameraPath: "M 1160 7160 L 1160 7630",
      cameraStops: [
        { key: "entry", x: 1160, y: 7160 },
        { key: "cta", x: 1160, y: 7630 }
      ],
      signal: {
        key: "cta-signal-continuous",
        d: "M 1160 7420 L 1160 7460 C 1160 7482 1175 7500 1200 7510",
        start: { x: 1160, y: 7420 },
        end: { x: 1200, y: 7510 }
      }
    }
  },

  howEntry: {
    target: { x: 1160, y: 5030 },
    trunk: {
      key: "how-entry-trunk",
      d: "M 1160 4950 L 1160 5220",
      revealDuration: 0.50
    },
    sources: {
      dataCenter: {
        key: "dc-to-how",
        cameraPath: "M 355 3980 L 355 4988 Q 355 5030 397 5030 L 1160 5030",
        cameraDuration: 1.65,
        signalPath: "M 355 4180 C 370 4210 355 4290 355 4380 L 355 4840 C 355 4880 390 4908 430 4908 L 1118 4908 Q 1160 4908 1160 4950",
        revealDuration: 1.35
      },
      it: {
        key: "it-to-how",
        cameraPath: "M 1160 4480 L 1160 5030",
        cameraDuration: 0.85,
        signalPath: "M 1160 4680 C 1175 4710 1160 4750 1160 4790 L 1160 4950",
        revealDuration: 0.60
      },
      av: {
        key: "av-to-how",
        cameraPath: "M 1960 4150 L 1960 4988 Q 1960 5030 1918 5030 L 1160 5030",
        cameraDuration: 1.55,
        signalPath: "M 1960 4550 L 1960 4840 C 1960 4880 1925 4908 1885 4908 L 1202 4908 Q 1160 4908 1160 4950",
        revealDuration: 1.25
      }
    },
    cameraEase: "power3.inOut",
    signalEase: "power2.inOut"
  },

  routeSignals: {
    dataCenter: {
      key: "route-dc",
      d: "M 910 1550 C 877 1555 820 1548 760 1522 C 720 1505 690 1510 650 1510 L 397 1510 Q 355 1510 355 1552 L 355 1700",
      start: { x: 910, y: 1550 },
      end: { x: 355, y: 1700 },
      revealDuration: 0.90
    },
    it: {
      key: "route-it",
      d: "M 1160 1550 L 1160 2230",
      start: { x: 1160, y: 1550 },
      end: { x: 1160, y: 2230 },
      revealDuration: 0.78
    },
    av: {
      key: "route-av",
      d: "M 1410 1550 C 1443 1555 1500 1548 1560 1522 C 1600 1505 1630 1510 1670 1510 L 1918 1510 Q 1960 1510 1960 1552 L 1960 1700",
      start: { x: 1410, y: 1550 },
      end: { x: 1960, y: 1700 },
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

        /*
         * Section 2 signal trunk. Its final origin geometry will be resolved
         * with the Section 2 redesign; no signal piece exists in the Hero.
         *
         * World:
         * (355,450)
         *       |
         *       |
         * (355,850)
         *
         * (355,850) continues into the About sequence.
         */
        d:
          "M 355 450 " +
          "L 355 850",

        start: {
          x: 355,
          y: 450
        },

        end: {
          x: 355,
          y: 850
        },

        window: {
          mode: "arc",
          from: 0.063,
          to: 0.221
        }
      },

      {
        key: "about-who",

        d:
          "M 355 850 " +
          "L 355 1108 " +
          "C 355 1135 380 1150 415 1150 " +
          "L 740 1150",

        start: {
          x: 355,
          y: 850
        },

        end: {
          x: 740,
          y: 1150
        },

        window: {
          mode: "arc",
          from: 0.284,
          to: 0.443
        }
      },

      {
        key: "about-principles",

        d:
          "M 740 1150 " +
          "C 800 1150 820 1122 850 1122 " +
          "C 880 1122 900 1150 930 1150 " +
          "C 995 1150 1020 1122 1080 1122 " +
          "C 1110 1122 1130 1150 1160 1150 " +
          "C 1215 1150 1240 1122 1310 1122 " +
          "C 1340 1122 1360 1150 1390 1150 " +
          "C 1425 1150 1438 1172 1428 1194 " +
          "C 1405 1238 1260 1218 1195 1242 " +
          "C 1170 1252 1160 1258 1160 1270",

        start: {
          x: 740,
          y: 1150
        },

        end: {
          x: 1160,
          y: 1270
        },

        window: {
          mode: "arc",
          from: 0.427,
          to: 0.775
        }
      },

      {
        key: "divisions-feed",
        d: "M 1160 1270 L 1160 1475",

        start: {
          x: 1160,
          y: 1270
        },

        end: {
          x: 1160,
          y: 1475
        },

        window: {
          mode: "arc",
          from: 0.760,
          to: 0.870
        }
      },

      {
        key: "division-dc",
        d:
          "M 1160 1475 " +
          "C 1095 1475 1055 1493 1005 1517 " +
          "C 970 1534 943 1545 910 1550",

        start: {
          x: 1160,
          y: 1475
        },

        end: {
          x: 910,
          y: 1550
        },

        window: {
          mode: "arc",
          from: 0.840,
          to: 0.985
        }
      },

      {
        key: "division-it",
        d: "M 1160 1475 C 1160 1500 1160 1525 1160 1550",

        start: {
          x: 1160,
          y: 1475
        },

        end: {
          x: 1160,
          y: 1550
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
          "M 1160 1475 " +
          "C 1225 1475 1265 1493 1315 1517 " +
          "C 1350 1534 1377 1545 1410 1550",

        start: {
          x: 1160,
          y: 1475
        },

        end: {
          x: 1410,
          y: 1550
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
          x: 355,
          y: 850
        },

        departure: 0
      },

      {
        from: "about-who",
        to: "about-principles",

        point: {
          x: 740,
          y: 1150
        },

        departure: 0
      },

      {
        from: "about-principles",
        to: "divisions-feed",

        point: {
          x: 1160,
          y: 1270
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-dc",

        point: {
          x: 1160,
          y: 1475
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-it",

        point: {
          x: 1160,
          y: 1475
        },

        departure: 0
      },

      {
        from: "divisions-feed",
        to: "division-av",

        point: {
          x: 1160,
          y: 1475
        },

        departure: 0
      }
    ],

    divisionContinuations: {
      dataCenter: {
        x: 910,
        y: 1550,
        direction: "left"
      },
      it: {
        x: 1160,
        y: 1550,
        direction: "down"
      },
      av: {
        x: 1410,
        y: 1550,
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
      x1: 740,
      y1: 850
    },
    {
      chapter: "c03",
      className: "on-paper",

      x0: 0,
      y0: 850,
      x1: 740,
      y1: 1270
    },
    {
      chapter: "how-work-main",
      className: "on-paper",
      x0: 0,
      y0: 5330,
      x1: 2340,
      y1: 6470
    }
  ]
};
