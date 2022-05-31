import dotenv from "dotenv"
import path from "path"

let isEnvLoaded = false

export function loadEnvVariables() {
	if (isEnvLoaded) return

	const envFile = path.join(__dirname, "..", "..", "..", ".env")
	const { error } = dotenv.config({ path: envFile })
	if (error) {
		console.log(error)
		return
	}

	console.log(`Loaded environment variables from ${envFile}`)
	isEnvLoaded = true
}
