import { createDatabaseSession, DatabaseSession } from "@core/database"
import { ConflictError } from "http-rest-api"
import { listProductBrandV1 } from "./listProductBrandV1"

export async function checkBrandTitleAvailabilityV1(
	{ title }: { title: string },
	existingSession?: DatabaseSession,
): Promise<void> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async () => {
		const [[brand]] = await listProductBrandV1({ filter: { title } }, session)
		if (brand) {
			throw new ConflictError(`Brand with title: ${title} already exist`)
		}
	})
}
