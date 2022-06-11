import { Brand } from "@core/types"
import { Product } from "@domain/Product/Product.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity, OneToMany } from "typeorm"

export type ProductBrandId = Brand<string, "ProductBrandId">

@Entity()
export class ProductBrand extends BaseEntity<ProductBrandId> {
	@Column({ type: "varchar", length: 100, unique: true })
	title!: string

	@Column({ type: "varchar", length: 1000 })
	description!: string

	@Column({ type: "varchar", length: 200, nullable: true })
	logoUrl!: string | null

	/**
	 *
	 * Following fields should be auto calculated
	 */

	@Column({ default: 0 })
	countProductVariants!: number

	@Column({ default: 0 })
	countPublishedProductVariants!: number

	@Column({ default: false })
	isPublished!: boolean

	/**
	 *
	 * Following fields are for maintaining relations
	 */

	@OneToMany(() => Product, (product) => product.brand)
	products!: Product[]

	build(init: { title: string; description?: string }) {
		this.title = init.title
		this.description = init.description ?? ""

		return this
	}
}
