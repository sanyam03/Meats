import { randomPassword } from "@domain/shared/test/Auth.resource"
import { randUserName } from "@ngneat/falso"
import { createAdminV1 } from "../createAdminV1"

export async function generateAdmin({ username }: { username?: string } = {}) {
	if (!username) username = generateAdminUsername()
	const password = randomPassword()

	const admin = await createAdminV1({ password, username })
	return { ...admin, password }
}

export function generateAdminUsername() {
	return randUserName().slice(0, 20)
}
