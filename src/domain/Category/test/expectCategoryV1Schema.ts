import { AuthRole } from "@core/auth"
import { expect } from "chai"

export async function expectCategoryV1Schema(
	el: any,
	role: AuthRole,
	include?: { parentCategory?: boolean },
) {
	expect(el).contains.keys([
		"id",
		"title",
		"categoryUrl",
		"description",
		"thumbnailUrl",
		"coverPhotoUrl",
		"countPublishedProductVariants",
		"countPublishedSubCategories",
		"parentCategoryId",
		...(include?.parentCategory ? ["parentCategory"] : []),
		...(role === AuthRole.ADMIN ? ["createdAt", "updatedAt"] : []),
	])
}
