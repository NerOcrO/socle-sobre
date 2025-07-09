import { APIContext, MiddlewareNext } from "astro"

import { getSession } from "./gateways/BetterAuthSessionGateway"

export async function onRequest(context: APIContext, next: MiddlewareNext): Promise<Response> {
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
  context.locals.isConnected = true
  // eslint-disable-next-line functional/immutable-data, require-atomic-updates
  context.locals.user = session.user

  return next()
}
