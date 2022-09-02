import { adminApis } from "./Admin"
import { categoryApis } from "./Category"
import { brandApis } from "./ProductBrand"

export const apis = [...adminApis, ...categoryApis, ...brandApis]
