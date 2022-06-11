import { Brand } from "@core/types"
import { Product } from "@domain/Product/Product.entity"
import { ProductVariant } from "@domain/ProductVariant/ProductVariant.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity, ManyToOne, OneToMany, RelationId, Unique } from "typeorm"

export type ProductColorId = Brand<string, "ProductColorId">

@Entity()
@Unique(["product", "title"])
export class ProductColor extends BaseEntity<ProductColorId> {
	@ManyToOne(() => Product, (product) => product.colors)
	product!: Product

	@RelationId((productColor: ProductColor) => productColor.product)
	productId!: Product["id"]

	@Column({ type: "varchar", length: 50 })
	title!: string

	@Column({ type: "varchar", length: 200, nullable: true })
	thumbnailUrl!: string | null

	/**
	 *
	 * Following fields are for maintaining relations
	 */

	@OneToMany(() => ProductVariant, (productVariant) => productVariant.productColor)
	variants!: ProductVariant[]

	build(init: { product: Product; title: string }) {
		this.product = init.product
		this.title = init.title

		return this
	}
}
