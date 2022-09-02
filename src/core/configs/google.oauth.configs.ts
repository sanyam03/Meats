import { loadEnvVariables } from "./loadEnvVariables"

loadEnvVariables()

export const googleAuth = { secret: process.env.GOOGLE_AUTH_CLIENT_ID || "secret" }
