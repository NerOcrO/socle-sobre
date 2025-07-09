import { APIContext } from "astro"

import { login } from "../gateways/BetterAuthSessionGateway"

export async function GET({ redirect, url }: APIContext): Promise<Response> {
  const provider = url.searchParams.get("provider")

  if (provider !== "github" && provider !== "google") {
    return new Response("Invalid provider", {
      status: 400,
    })
  }

  const redirectUrl = await login(provider)

  return redirect(redirectUrl)
}
