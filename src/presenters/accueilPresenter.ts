import { AccueilReadModel } from "../use-cases/queries/AfficherAccueil"

export function accueilPresenter(accueilReadModel: AccueilReadModel): AccueilViewModel {
  return {
    clikedApi: `${import.meta.env.ORIGIN}/clicked`,
    message: accueilReadModel.message,
  }
}

export type AccueilViewModel = {
  clikedApi: string
  message: string
}
