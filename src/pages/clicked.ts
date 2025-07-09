import { clickedController } from "../controllers/clickedController"
import { renderAstro } from "../shared/astro"
import Clicked from "../views/clicked/Clicked.astro"

export async function GET(): Promise<Response> {
  const viewModel = clickedController()

  return new Response(
    await renderAstro(Clicked, { props: { username: viewModel.username } }),
  )
}
