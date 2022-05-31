import path from "path"
import { ConnectionOptions } from "typeorm"
import { dbConfigs } from "@core/configs"

const entityPath = path.join(__dirname, "..", "..", "domain", "**", "*.entity.{ts,js}")
const migrationsPath = path.join(__dirname, "migrations", "*{.ts,.js}")

export default {
	...dbConfigs,
	type: "postgres",
	entities: [entityPath],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: true,

	logging: false,

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: [migrationsPath],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: "src/core/database/migrations",
	},
} as ConnectionOptions
