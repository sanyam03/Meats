import { randomPassword } from "@domain/shared/test/Auth.resource"
import { createAdminV1 } from "../createAdminV1"
import { generateAdminUsername } from "./generateAdminUsername"

export async function generateAdmin({ username }: { username?: string } = {}) {
	if (!username) username = generateAdminUsername()
	const password = randomPassword()

	const admin = await createAdminV1({ password, username })
	return { ...admin, password }
}
