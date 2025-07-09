import { Props } from "astro"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { loadRenderers } from "astro/virtual-modules/container.js"

export async function renderAstro(component: unknown, props?: Props): Promise<string> {
  const renderers = await loadRenderers([])
  const container = await AstroContainer.create({ renderers })
  // @ts-expect-error
  return container.renderToString(component, { props })
}
