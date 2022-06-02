import { Category } from "./Category.entity"

export function dumpCategoryV1(category: Category) {
	const { id, createdAt, updatedAt, thumbnailUrl, title } = category
	return { id, createdAt, updatedAt, thumbnailUrl, title }
}
