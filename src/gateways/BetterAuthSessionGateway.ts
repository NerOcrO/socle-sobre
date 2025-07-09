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
  await authentificationService.api.revokeSessions({
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
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
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
