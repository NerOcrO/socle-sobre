import { Prisma } from "@prisma/client"

import { UtilisateurRepository } from "../use-cases/commands/AjouterUnUtilisateur"

export class PrismaUtilisateurRepository implements UtilisateurRepository {
  readonly #dataResource: Prisma.UserDelegate

  constructor(dataResource: Prisma.UserDelegate) {
    this.#dataResource = dataResource
  }

  async add(name: string): Promise<boolean> {
    await this.#dataResource.create({ data: { name } })

    return true
  }
}
