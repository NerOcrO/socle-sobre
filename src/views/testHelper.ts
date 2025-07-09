import { Props } from "astro"
import { RequestHandler } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, Mock, vi } from "vitest"

import { renderAstro } from "../shared/astro"

export async function renderComponent(component: unknown, props?: Props): Promise<void> {
  const html = await renderAstro(component, props)

  // eslint-disable-next-line no-restricted-syntax
  const div = document.createElement("div")
  // eslint-disable-next-line functional/immutable-data
  div.innerHTML = html
  // eslint-disable-next-line no-restricted-syntax
  document.body.replaceChildren(div)

  stubedXPathEvaluator()
  // Map HTMLDocument vers Document (happy-dom fix)
  // @ts-expect-error
  // eslint-disable-next-line functional/immutable-data, no-restricted-syntax
  globalThis.Document = globalThis.document.constructor

  const htmx = (await import("htmx.org")).default
  // eslint-disable-next-line no-restricted-syntax
  htmx.process(document.body)

  const alpinejs = await import("alpinejs")
  alpinejs.initTree(div)
}

export function runSpiedServer(requestHandler: Array<RequestHandler>): void {
  const server = setupServer(...requestHandler)

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
}

function stubedXPathEvaluator(): void {
  function evaluate(): { iterateNext: Mock } {
    return {
      iterateNext: vi.fn(),
    }
  }

  vi.stubGlobal(
    "XPathEvaluator",
    vi.fn().mockImplementation(() => ({
      createExpression: (): { evaluate(): { iterateNext: Mock } } => ({
        evaluate,
      }),
    })),
  )
}
