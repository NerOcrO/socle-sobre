import { PrismaUtilisateursLoader } from "../gateways/PrismaUtilisateursLoader"
import { utilisateursPresenter, UtilisateursViewModel } from "../presenters/utilisateursPresenter"

export async function utilisateursController(): Promise<UtilisateursViewModel> {
  const loader = new PrismaUtilisateursLoader()

  const readModel = await loader.get()

  return utilisateursPresenter(readModel)
}
