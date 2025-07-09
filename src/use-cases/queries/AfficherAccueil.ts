export function afficherAccueil(): AccueilReadModel {
  return {
    message: "Hello Fabien",
  }
}

export type AccueilReadModel = {
  message: string
}
