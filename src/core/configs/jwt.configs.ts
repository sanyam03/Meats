import { loadEnvVariables } from "./loadEnvVariables"

loadEnvVariables()

export const jwtConfigs = { secret: process.env.JWT_SECRET || "secret" }
