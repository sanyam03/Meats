import { Brand } from "@core/types"
import { ProductVariant } from "@domain/ProductVariant/ProductVariant.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity, ManyToOne, RelationId } from "typeorm"

export type ProductVariantStockEntryId = Brand<string, "ProductVariantStockEntryId">

@Entity()
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
