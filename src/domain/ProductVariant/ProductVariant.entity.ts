import { Brand } from "@core/types"
import { ProductColor } from "@domain/ProductColor/ProductColor.entity"
import { ProductVariantStockEntry } from "@domain/ProductVariantStockEntry/ProductVariantStockEntry.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Check, Column, Entity, ManyToOne, OneToMany, RelationId, Unique } from "typeorm"

export type ProductVariantId = Brand<string, "ProductVariantId">

@Entity()
@Unique(["productColorId", "size"])
@Check(`"maxRetailPrice" > 0`)
@Check(`"discountedPrice" > 0 AND "discountedPrice" <= "maxRetailPrice"`)
export class ProductVariant extends BaseEntity<ProductVariantId> {
	@ManyToOne(() => ProductColor, (productColor) => productColor.variants)
	productColor!: ProductColor

	@RelationId((productVariant: ProductVariant) => productVariant.productColor)
	productColorId!: ProductColor["id"]

	@Column({ type: "varchar", length: 50 })
	size!: string

	@Column({ type: "varchar", length: 20, unique: true })
	productVariantCode!: string

	@Column({ type: "varchar", length: 100, unique: true })
	productVariantUrl!: string

	@Column()
	maxRetailPrice!: number

	@Column()
	discountedPrice!: number

	/**
	 *
	 * Following fields should be auto calculated
	 */

	@Column({ default: 0 })
	currentStock!: number

	/**
	 *
	 * Following fields are for maintaining relations
	 */

	@OneToMany(
		() => ProductVariantStockEntry,
		(productVariantStockEntry) => productVariantStockEntry.productVariant,
	)
	stockEntries!: ProductVariantStockEntry[]

	build(init: {
		productColor: ProductColor
		size: string
		productVariantCode: string
		maxRetailPrice: number
		discountedPrice: number
	}) {
		this.productColor = init.productColor
		this.size = init.size
		this.productVariantCode = init.productVariantCode
		this.maxRetailPrice = init.maxRetailPrice
		this.discountedPrice = init.discountedPrice

		return this
	}
}
