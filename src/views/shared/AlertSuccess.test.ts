import { screen } from "@testing-library/dom"

import { renderComponent } from "../testHelper"
import AlertSuccess from "./AlertSuccess.astro"

describe("succès de l'alerte", () => {
  it("succès de l’alerte", async () => {
    // GIVEN
    const viewModel = { message: "coucou" }

    // WHEN
    await renderComponent(AlertSuccess, viewModel)

    // THEN
    const titre = screen.getByRole("heading", { level: 3, name: "Succès de l'envoi" })
    expect(titre).toBeInTheDocument()
    const message = screen.getByText("coucou")
    expect(message).toBeInTheDocument()
  })
})
