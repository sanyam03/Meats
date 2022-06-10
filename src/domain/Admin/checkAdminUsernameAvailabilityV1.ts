import { createDatabaseSession, DatabaseSession } from "@core/database"
import { ConflictError } from "http-rest-api"
import { listAdminV1 } from "./listAdminV1"

export async function checkAdminUsernameAvailabilityV1(
	{ username }: { username: string },
	existingSession?: DatabaseSession,
): Promise<void> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async () => {
		const [[admin]] = await listAdminV1({ filter: { username } }, session)
		if (admin) {
			throw new ConflictError(`Admin with username: ${username} already exist`)
		}
	})
}
