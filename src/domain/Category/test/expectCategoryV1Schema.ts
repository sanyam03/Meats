import { expect } from "chai"

export async function expectCategoryV1Schema(el: any) {
	expect(el).contains.keys(["id", "createdAt", "updatedAt", "title", "thumbnailUrl"])
}
