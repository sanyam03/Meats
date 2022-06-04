import { createDatabaseSession, DatabaseSession } from "@core/database"
import { ConflictError } from "@core/http"
import { listCategoryV1 } from "./listCategoryV1"

export async function checkCategoryTitleAvailabilityV1(
	{ title }: { title: string },
	existingSession?: DatabaseSession,
): Promise<void> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async () => {
		const [[category]] = await listCategoryV1({ filter: { title } }, session)
		if (category) {
			throw new ConflictError(`Category with title: ${title} already exist`)
		}
	})
}
