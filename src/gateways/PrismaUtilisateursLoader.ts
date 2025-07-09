import { User } from "@prisma/client"

import prisma from "../../prisma/prismaClient"
import { UtilisateursLoader, UtilisateursReadModel } from "../use-cases/queries/RecupererLesUtilisateurs"

export class PrismaUtilisateursLoader implements UtilisateursLoader {
  readonly #dataResource = prisma.user

  async get(): Promise<ReadonlyArray<UtilisateursReadModel>> {
    const utilisateursRecord = await this.#dataResource.findMany({
      orderBy: {
        id: "desc",
      },
    })

    return transformToReadModel(utilisateursRecord)
  }
}

function transformToReadModel(utilisateursRecord: ReadonlyArray<User>): ReadonlyArray<UtilisateursReadModel> {
  return utilisateursRecord.map((utilisateurRecord) => ({
    id: utilisateurRecord.id,
    name: utilisateurRecord.name,
  }))
}
