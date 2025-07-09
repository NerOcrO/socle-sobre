import { fireEvent, screen } from "@testing-library/dom"

import { renderComponent } from "../testHelper"
import AlpinejsPage from "./AlpinejsPage.astro"

describe("alpine.js", () => {
  it("alpine.js", async () => {
    // GIVEN
    await renderComponent(AlpinejsPage)

    // WHEN
    const button = screen.getByRole("button", { name: "Increment" })
    fireEvent.click(button)
    fireEvent.click(button)

    // THEN
    const result = await screen.findByText("2")
    expect(result).toBeInTheDocument()
  })
})
