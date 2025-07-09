import { accueilPresenter, AccueilViewModel } from "../presenters/accueilPresenter"
import { afficherAccueil } from "../use-cases/queries/AfficherAccueil"

export function accueilController(): AccueilViewModel {
  const readModel = afficherAccueil()

  return accueilPresenter(readModel)
}
