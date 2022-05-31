import { loadEnvVariables } from "./loadEnvVariables"

loadEnvVariables()

const database = process.env.DB_NAME
if (!database) {
	throw new Error("DB_NAME is not defined")
}

export const dbConfigs = {
	type: "postgres",
	username: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "",
	database,
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
}
