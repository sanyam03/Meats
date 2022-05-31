import { DatabaseSession } from "./DatabaseSession"

export function createDatabaseSession(existingSession?: DatabaseSession) {
	return new DatabaseSession(existingSession)
}

export { DatabaseSession }
