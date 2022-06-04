import { randProductCategory, randProductDescription } from "@ngneat/falso"
import { createCategoryV1 } from "../createCategoryV1"

export async function generateCategory() {
	const title = randProductCategory()
	const description = randProductDescription()

	return await createCategoryV1({ title, description })
}
