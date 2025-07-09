import { AccueilReadModel, afficherAccueil } from "./AfficherAccueil"

describe("afficher accueil", () => {
  it("afficher accueil", () => {
    // WHEN
    const afficher = afficherAccueil()

    // THEN
    expect(afficher).toStrictEqual<AccueilReadModel>({
      message: "Hello Fabien",
    })
  })
})
