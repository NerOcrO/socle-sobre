import { accueilPresenter, AccueilViewModel } from "./accueilPresenter"

describe("accueil presenter", () => {
  it("accueil presenter", () => {
    // GIVEN
    const accueilReadModel = {
      message: "",
    }

    // WHEN
    const presenter = accueilPresenter(accueilReadModel)

    // THEN
    expect(presenter).toStrictEqual<AccueilViewModel>({
      clikedApi: "http://example.com/clicked",
      message: "",
    })
  })
})
