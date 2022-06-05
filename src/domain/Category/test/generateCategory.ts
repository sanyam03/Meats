import { ConflictError } from "@core/http"
import { randProductCategory, randProductDescription } from "@ngneat/falso"
import { Category } from "../Category.entity"
import { checkCategoryTitleAvailabilityV1 } from "../checkCategoryNameAvailabilityV1"
import { createCategoryV1 } from "../createCategoryV1"

export async function generateCategory(options?: {
	withParentCategory?: boolean
}): Promise<Category> {
	const title = await getAvailableCategoryTitle()
	const description = randProductDescription()
	const parentCategoryId = options?.withParentCategory
		? (await generateCategory()).id
		: null

	return await createCategoryV1({ title, description, parentCategoryId })
}

export async function getAvailableCategoryTitle() {
	let title = randProductCategory()

	do {
		try {
			await checkCategoryTitleAvailabilityV1({ title })
			return title
		} catch (err) {
			if (err instanceof ConflictError) {
				title = randProductCategory()
				continue
			}
			throw err
		}
	} while (true)
}
