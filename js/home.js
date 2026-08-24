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
    w: 740,
    h: 830
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
        columnX: 60
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
     * y 450 → 830
     */
    c02: {
      key: "c02",
      type: "paper",
      x: 0,
      y: 450,
      w: 740,
      h: 380,

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
    path: "M 355 200 L 355 650",

    stops: {
      hero: {
        x: 355,
        y: 200
      },

      principle: {
        x: 355,
        y: 650
      }
    }
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
        key: "hero-entry-orbit",

        /*
         * Starts above the world.
         *
         * The first three cubics form a controlled decaying entry wave.
         * Then the supplied orbit geometry moves around the mark.
         *
         * End:
         * (470,340)
         */
        d:
          "M 650 -140 " +

          "C 675 -120 675 -100 650 -80 " +
          "C 625 -60 630 -40 650 -25 " +
          "C 665 -10 660 5 650 20 " +

          "C 735 165 620 320 470 340",

        start: {
          x: 650,
          y: -140
        },

        end: {
          x: 470,
          y: 340
        },

        window: {
          mode: "hold",
          from: 0.0,
          to: 0.8
        }
      },

      {
        key: "hero-exit",

        /*
         * Exact supplied exit geometry.
         *
         * This ends at the c01 → c02 seam.
         */
        d:
          "M 470 340 " +
          "C 410 348 370 410 355 450",

        start: {
          x: 470,
          y: 340
        },

        end: {
          x: 355,
          y: 450
        },

        window: {
          mode: "arc",
          from: 0.0,
          to: 0.18
        }
      },

      {
        key: "principle-trunk",

        /*
         * Exact continuation from Hero.
         *
         * World:
         * (355,450)
         *       |
         *       |
         * (355,830)
         *
         * (355,830) is reserved for the future
         * three-division split.
         */
        d:
          "M 355 450 " +
          "L 355 830",

        start: {
          x: 355,
          y: 450
        },

        end: {
          x: 355,
          y: 830
        },

        window: {
          mode: "arc",
          from: 0.08,
          to: 1.0
        }
      }
    ],

    seams: [
      {
        from: "hero-entry-orbit",
        to: "hero-exit",

        point: {
          x: 470,
          y: 340
        },

        departure: 0
      },

      {
        from: "hero-exit",
        to: "principle-trunk",

        point: {
          x: 355,
          y: 450
        },

        departure: 0
      }
    ],

    reservedContinuation: {
      x: 355,
      y: 830
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
      y1: 830
    }
  ]
};
