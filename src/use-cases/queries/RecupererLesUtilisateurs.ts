export interface UtilisateursLoader {
  get(): Promise<ReadonlyArray<UtilisateursReadModel>>
}

export type UtilisateursReadModel = {
  id: number
  name: string
}
