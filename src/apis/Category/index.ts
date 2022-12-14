import { apiCategoryAddV1 } from "./apiCategoryAddV1"
import { apiCategoryDeleteV1 } from "./apiCategoryDeleteV1"
import { apiCategoryListV1 } from "./apiCategoryListV1"
import { apiCategoryUpdateParentCategoryV1 } from "./apiCategoryUpdateParentCategoryV1"
import { apiCategoryUpdateV1 } from "./apiCategoryUpdateV1"

export const categoryApis = [
	apiCategoryAddV1,
	apiCategoryListV1,
	apiCategoryDeleteV1,
	apiCategoryUpdateV1,
	apiCategoryUpdateParentCategoryV1,
]
