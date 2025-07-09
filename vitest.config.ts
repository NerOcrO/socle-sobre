import { getViteConfig } from "astro/config"

export default getViteConfig({
  plugins: [
    {
      name: "test-svg",
      transform(_, id): "" | "export default () => {}" {
        if (id.endsWith(".svg")) {
          return "export default () => {}"
        }
        return ""
      },
    },
  ],
  // @ts-expect-error
  test: {
    chaiConfig: {
      truncateThreshold: 0,
    },
    coverage: {
      exclude: [
        "**/middleware.ts",
        "src/**/*.test.ts",
        "src/pages",
        "src/views/transverse/Layout*",
      ],
      include: ["src/**/*"],
      provider: "istanbul",
      skipFull: true,
      watermarks: {
        branches: [90, 100],
        functions: [90, 100],
        lines: [90, 100],
        statements: [90, 100],
      },
    },
    globals: true,
    include: ["src/**/*.test.ts"],
    projects: [
      {
        extends: true,
        test: {
          environment: "happy-dom",
          include: ["src/views/**.test.ts"],
        },
      },
    ],
    reporters: ["verbose"],
    sequence: { shuffle: true },
    setupFiles: ["vitest.setup.ts"],
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
