import { AuthRole } from "@core/auth"
import { Category } from "./Category.entity"

export function serializeCategoryV1(
	category: Category,
	role: AuthRole,
	include?: { parentCategory?: boolean },
) {
	const {
		id,
		createdAt,
		updatedAt,
		title,
		categoryUrl,
		description,
		parentCategory,
		parentCategoryId,
		thumbnailUrl,
		countProductVariants,
		countPublishedProductVariants,
		countPublishedSubCategories,
		countSubCategories,
		coverPhotoUrl,
		isPublished,
	} = category
	return {
		id,
		title,
		categoryUrl,
		description,
		thumbnailUrl,
		coverPhotoUrl,
		countPublishedProductVariants,
		countPublishedSubCategories,
		parentCategoryId,
		parentCategory: include?.parentCategory ? parentCategory : undefined,
		...(role === AuthRole.ADMIN
			? {
					createdAt,
					updatedAt,
					countProductVariants,
					countSubCategories,
					isPublished,
			  }
			: {}),
	}
}

export function serializeCategoryListV1(
	categoryList: Category[],
	role: AuthRole,
	include?: { parentCategory?: boolean },
) {
	return categoryList.map((el) => serializeCategoryV1(el, role, include))
}
