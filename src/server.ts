import { serverConfigs } from "@core/configs/index"
import { connectDatabase, isDatabaseConnected } from "@core/database/databaseConnection"
import { HttpServer } from "http-rest-api"
import cors from "cors"
import express from "express"
import { apis } from "./apis"

export default async function server() {
	console.log(`Server initialization request created`)
	await initializeDataSourceConnection()
	const app = new HttpServer(serverConfigs.port)

	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.registerRestApis(...apis)

	app.listen().then((port) => console.log(`Server listening on port: ${port}`))
	return app
}

async function initializeDataSourceConnection() {
	if (isDatabaseConnected()) return
	try {
		await connectDatabase()
		console.log("Database connection initialized successfully.")
	} catch (err) {
		console.log("Database connection initialization failed.")
		console.log(err)
	}
}
