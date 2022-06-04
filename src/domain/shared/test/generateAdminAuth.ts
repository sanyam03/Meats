import { AuthRole, createAuthTokens } from "@core/auth"
import { generateAdmin } from "@domain/Admin/test/generateAdmin"

export async function generateAdminAuth() {
	const admin = await generateAdmin()
	return createAuthTokens({ role: AuthRole.ADMIN, id: admin.id })
}
