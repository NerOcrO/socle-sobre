import node from "@astrojs/node"
import sentry from "@sentry/astro"
import { defineConfig } from "astro/config"
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadEnv } from "vite"

const { SENTRY_DSN, SENTRY_ENVIRONMENT } = loadEnv(String(process.env.NODE_ENV), process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    sentry({
      debug: false,
      dsn: String(SENTRY_DSN),
      environment: String(SENTRY_ENVIRONMENT),
      sourceMapsUploadOptions: {
        enabled: false,
        telemetry: false,
      },
      tracesSampleRate: 1,
    }),
  ],
  output: "server",
  server: { port: 3000 },
})
