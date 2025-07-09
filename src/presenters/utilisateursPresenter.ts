import { UtilisateursReadModel } from "../use-cases/queries/RecupererLesUtilisateurs"

export function utilisateursPresenter(
  utilisateursReadModel: ReadonlyArray<UtilisateursReadModel>,
): UtilisateursViewModel {
  return {
    ajouterUtilisateurApi: `${import.meta.env.ORIGIN}/ajouter-utilisateur`,
    utilisateurs: utilisateursReadModel,
  }
}

export type UtilisateursViewModel = {
  ajouterUtilisateurApi: string
  utilisateurs: ReadonlyArray<{
    id: number
    name: string
  }>
}
