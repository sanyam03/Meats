import { Brand } from "@core/types"
import { ProductVariant } from "@domain/ProductVariant/ProductVariant.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Check, Column, Entity, ManyToOne, RelationId, Unique } from "typeorm"

export type ProductVariantStockEntryId = Brand<string, "ProductVariantStockEntryId">

@Entity()
@Unique(["productColorId", "size"])
@Check(`"maxRetailPrice" > 0`)
@Check(`"discountedPrice" > 0 AND "discountedPrice" <= "maxRetailPrice"`)
export class ProductVariantStockEntry extends BaseEntity<ProductVariantStockEntryId> {
	@ManyToOne(() => ProductVariant, (productVariant) => productVariant.stockEntries)
	productVariant!: ProductVariant

	@RelationId(
		(productVariantStockEntry: ProductVariantStockEntry) =>
			productVariantStockEntry.productVariant,
	)
	productVariantId!: ProductVariant["id"]

	@Column()
	quantity!: number

	build(init: { productVariant: ProductVariant; quantity: number }) {
		this.productVariant = init.productVariant
		this.quantity = init.quantity

		return this
	}
}
