import prisma from "../../prisma/prismaClient"
import { PrismaUtilisateurRepository } from "../gateways/PrismaUtilisateurRepository"
import { AddUserViewModel } from "../presenters/ajouterUnUtilisateurPresenter"
import { AjouterUnUtilisateur } from "../use-cases/commands/AjouterUnUtilisateur"

export async function ajouterUnUtilisateurController(param: Params): Promise<AddUserViewModel> {
  // Permet de voir que le bouton de soumission du formulaire devient inactif pour éviter le flood
  await sleep(1000)

  const repository = new PrismaUtilisateurRepository(prisma.user)
  const ajouterUnUtilisateur = new AjouterUnUtilisateur(repository)
  await ajouterUnUtilisateur.handle({ name: param.username })

  return {
    message: "L’utilisateur a bien été ajouté",
    utilisateur: param.username,
  }
}

type Params = {
  username: string
}

async function sleep(duration: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
