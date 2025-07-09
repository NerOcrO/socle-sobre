import { APIContext, MiddlewareNext } from "astro"
import { sequence } from "astro/middleware"

import { getSession } from "./gateways/BetterAuthSessionGateway"

export const onRequest = sequence(setSecurityHeaders, handleSession)

async function setSecurityHeaders(_: APIContext, next: MiddlewareNext): Promise<Response> {
  const response = await next()

  // https://owasp.org/www-project-secure-headers/
  response.headers.append("X-Frame-Options", "deny")
  response.headers.append("X-Content-Type-Options", "nosniff")
  response.headers.append("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  response.headers.append("Referrer-Policy", "strict-origin-when-cross-origin")
  // response.headers.append(
  //   "Content-Security-Policy",
  //   "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
  // )
  response.headers.append(
    "Permissions-Policy",
    "accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), unload=()",
  )

  return response
}

async function handleSession(context: APIContext, next: MiddlewareNext): Promise<Response> {
  if (
    context.originPathname === "/connexion"
    || context.originPathname === "/login"
    || context.originPathname === "/api/auth/callback/github"
    || context.originPathname === "/api/auth/callback/google"
  ) {
    return next()
  }

  const session = await getSession(context.request.headers)

  if (session === null) {
    return context.redirect("/connexion")
  }

  // eslint-disable-next-line functional/immutable-data, require-atomic-updates
  context.locals.user = session.user

  return next()
}
