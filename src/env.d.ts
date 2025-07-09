/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    isConnected: boolean
    user: {
      createdAt: Date
      email: string
      emailVerified: boolean
      id: string
      image?: null | string | undefined
      name: string
      updatedAt: Date
    }
  }
}
