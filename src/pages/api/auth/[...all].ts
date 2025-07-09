import { APIContext } from "astro"

import { authentificationService } from "../../../gateways/BetterAuthSessionGateway"

export async function ALL(context: APIContext): Promise<Response> {
  return authentificationService.handler(context.request)
}
