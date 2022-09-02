import { AuthRole } from "@core/auth"
import { ProductBrand } from "./ProductBrand.entity"

export function serializeBrandV1(brand: ProductBrand, role: AuthRole) {
	const {
		id,
		createdAt,
		updatedAt,
		title,
		description,
		countProductVariants,
		countPublishedProductVariants,
		isPublished,
	} = brand
	return {
		id,
		title,
		description,
		countPublishedProductVariants,
		...(role === AuthRole.ADMIN
			? {
					createdAt,
					updatedAt,
					countProductVariants,
					isPublished,
			  }
			: {}),
	}
}

export function serializeBrandListV1(brandList: ProductBrand[], role: AuthRole) {
	return brandList.map((el) => serializeBrandV1(el, role))
}
