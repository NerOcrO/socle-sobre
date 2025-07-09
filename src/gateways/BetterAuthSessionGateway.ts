import { betterAuth } from "better-auth"
import { loadEnvFile } from "process"

export async function getSession(headers: Headers): Promise<Session> {
  return authentificationService.api.getSession({ headers })
}

export async function login(provider: "github" | "google"): Promise<string> {
  const authResponse = await authentificationService.api.signInSocial({
    body: {
      callbackURL: "/",
      provider,
    },
  })

  return String(authResponse.url)
}

export async function logout(headers: Headers): Promise<void> {
  const session = await authentificationService.api.getSession({ headers })

  await authentificationService.api.revokeSession({
    body: {
      // Il faut le token de la session et non pas celui du cookie.
      token: String(session?.session.token),
    },
    headers,
  })
}

loadEnvFile(".env")
const uneHeure = 86_400
export const authentificationService = betterAuth({
  session: {
    cookieCache: {
      // ajoute le cookie better-auth.session_data qui fait que je garde ma session après un hot-reloading
      enabled: true,
      maxAge: uneHeure,
    },
  },
  socialProviders: {
    github: {
      clientId: String(import.meta.env.GITHUB_CLIENT_ID),
      clientSecret: String(import.meta.env.GITHUB_CLIENT_SECRET),
    },
    google: {
      clientId: String(import.meta.env.GOOGLE_CLIENT_ID),
      clientSecret: String(import.meta.env.GOOGLE_CLIENT_SECRET),
    },
  },
})

type Session = {
  session: {
    createdAt: Date
    expiresAt: Date
    id: string
    ipAddress?: null | string | undefined
    token: string
    updatedAt: Date
    userAgent?: null | string | undefined
    userId: string
  }
  user: {
    createdAt: Date
    email: string
    emailVerified: boolean
    id: string
    image?: null | string | undefined
    name: string
    updatedAt: Date
  }
} | null
