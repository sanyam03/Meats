import { AuthRole } from "@core/auth"
import { expect } from "chai"

export async function expectBrandV1Schema(el: any, role: AuthRole) {
	expect(el).contains.keys([
		"id",
		"title",
		"logoUrl",
		"description",
		...(role === AuthRole.ADMIN ? ["createdAt", "updatedAt"] : []),
	])
}
