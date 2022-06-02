import { randProductCategory } from "@ngneat/falso"
import { createCategoryV1 } from "../createCategoryV1"

export async function generateCategory() {
	const title = randProductCategory()
	return await createCategoryV1({ title })
}
