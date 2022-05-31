import { loadEnvVariables } from "./loadEnvVariables"

loadEnvVariables()

const environment = process.env.NODE_ENV || "development"
const port = validateServerPortNo(process.env.PORT)

if (!process.env.APP_NAME) throw new Error("APP_NAME environment variable is not set")
const appName = process.env.APP_NAME

export const serverConfigs = { environment, port, appName }

function validateServerPortNo(port: string | undefined) {
	if (!port) throw new Error("PORT environment variable is not set")
	let result = Number(process.env.PORT)
	if (Number.isNaN(result)) {
		throw new Error("PORT environment variable is not numeric value")
	}

	return result
}
