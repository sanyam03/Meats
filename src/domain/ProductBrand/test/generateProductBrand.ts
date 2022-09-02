import { ConflictError } from "http-rest-api"
import { randBrand, randProductDescription } from "@ngneat/falso"
import { checkBrandTitleAvailabilityV1 } from "../checkProductBrandNameAvailabilityV1"
import { createProductBrandV1 } from "../createProductBrandV1"
import { ProductBrand } from "../ProductBrand.entity"

export async function generateBrand(): Promise<ProductBrand> {
	const title = await getAvailableBrandTitle()
	const description = randProductDescription()

	return await createProductBrandV1({ title, description })
}

export async function getAvailableBrandTitle() {
	let title = randBrand()

	do {
		try {
			await checkBrandTitleAvailabilityV1({ title })
			return title
		} catch (err) {
			if (err instanceof ConflictError) {
				title = randBrand()
				continue
			}
			throw err
		}
	} while (true)
}
