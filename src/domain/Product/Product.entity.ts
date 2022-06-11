import { Brand } from "@core/types"
import { Category } from "@domain/Category/Category.entity"
import { ProductBrand } from "@domain/ProductBrand/ProductBrand.entity"
import { ProductColor } from "@domain/ProductColor/ProductColor.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm"

export type ProductId = Brand<string, "ProductId">

@Entity()
export class Product extends BaseEntity<ProductId> {
	@ManyToOne(() => Category, (category) => category.products)
	category!: Category

	@RelationId((product: Product) => product.category)
	categoryId!: Category["id"]

	@ManyToOne(() => Category, (category) => category.products, { nullable: true })
	brand!: ProductBrand | null

	@RelationId((product: Product) => product.brand)
	brandId!: ProductBrand["id"] | null

	@Column({ type: "varchar", length: 100, unique: true })
	title!: string

	@Column({ type: "varchar", length: 1000 })
	description!: string

	@Column({ type: "json", nullable: true })
	specificationInJson!: object | null

	@Column({ default: false })
	isPublished!: boolean

	/**
	 *
	 * Following fields should be auto calculated
	 */

	@Column({ default: 0 })
	countVariants!: number

	/**
	 *
	 * Following fields are for maintaining relations
	 */

	@OneToMany(() => ProductColor, (productColor) => productColor.product)
	colors!: ProductColor[]

	build(init: {
		category: Category
		brand?: ProductBrand | null
		title: string
		description?: string
	}) {
		this.category = init.category
		this.brand = init.brand ?? null
		this.title = init.title
		this.description = init.description ?? ""

		return this
	}
}
