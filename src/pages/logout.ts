import { APIContext } from "astro"

import { logout } from "../gateways/BetterAuthSessionGateway"

export async function GET({ redirect, request }: APIContext): Promise<Response> {
  await logout(request.headers)

  return redirect("/connexion")
}
