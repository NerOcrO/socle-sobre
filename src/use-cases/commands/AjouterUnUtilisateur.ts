import { CommandHandler, ResultAsync } from "../CommandHandler"

export class AjouterUnUtilisateur implements CommandHandler<Command> {
  readonly #utilisateurRepository: AddUtilisateurRepository

  constructor(utilisateurRepository: AddUtilisateurRepository) {
    this.#utilisateurRepository = utilisateurRepository
  }

  async handle(command: Command): ResultAsync<Failure> {
    await this.#utilisateurRepository.add(command.name)

    return "OK"
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UtilisateurRepository extends AddUtilisateurRepository {}

interface AddUtilisateurRepository {
  add(name: string): Promise<boolean>
}

type Failure = "UtilisateurVide"

type Command = {
  name: string
}
