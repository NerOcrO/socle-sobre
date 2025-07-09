import { APIContext } from "astro"

import { ajouterUnUtilisateurController } from "../controllers/ajouterUnUtilisateurController"
import { renderAstro } from "../shared/astro"
import AlertError from "../views/shared/AlertError.astro"
import AlertSuccess from "../views/shared/AlertSuccess.astro"
import Utilisateur from "../views/utilisateurs/Utilisateur.astro"

export async function POST({ request }: APIContext): Promise<Response> {
  const formData = await request.formData()
  const [username] = formData.values() as FormDataIterator<string>

  if (username === undefined) {
    return new Response(
      await renderAstro(AlertError, { message: "Le nom d’utilisateur ne peut pas être vide" }),
    )
  }

  const viewModel = await ajouterUnUtilisateurController({ username })

  return new Response(
    await renderAstro(
      Utilisateur,
      { utilisateur: viewModel.utilisateur },
    )
      + await renderAstro(
        AlertSuccess,
        { message: viewModel.message },
      ),
  )
}
