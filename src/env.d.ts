/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: import("better-auth").User
  }
}

interface ImportMetaEnv {
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  NODE_ENV: string
  ORIGIN: string
  SENTRY_DSN: string
  SENTRY_ENVIRONMENT: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
