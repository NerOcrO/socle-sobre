import { fireEvent, screen } from "@testing-library/dom"
import { http, HttpResponse } from "msw"

import AccueilPage from "./AccueilPage.astro"
import { renderComponent, runSpiedServer } from "../testHelper"

runSpiedServer([
  http.get("/clicked-spy", () => {
    return HttpResponse.html("<p>Bonjour</p>")
  }),
])

describe("accueil", () => {
  it("accueil", async () => {
    // GIVEN
    const viewModel = { clikedApi: "/clicked-spy", message: "coucou" }

    // WHEN
    await renderComponent(AccueilPage, viewModel)

    // THEN
    const titre = screen.getByRole("heading", { level: 1, name: "Message dynamique : coucou" })
    expect(titre).toBeInTheDocument()
    const button = screen.getByRole("button", { name: "Click Me!" })
    expect(button).toBeInTheDocument()
  })

  it("quand je clique sur le bouton, alors un texte s'affiche", async () => {
    // GIVEN
    const viewModel = { clikedApi: "/clicked-spy", message: "coucou" }
    await renderComponent(AccueilPage, viewModel)

    // WHEN
    const button = screen.getByRole("button", { name: "Click Me!" })
    fireEvent.click(button)

    // THEN
    const response = await screen.findByText("Bonjour", { selector: "p" })
    expect(response).toBeInTheDocument()
  })
})
