import { Brand } from "@core/types"
import { Category } from "@domain/Category/Category.entity"
import { ProductBrand } from "@domain/ProductBrand/ProductBrand.entity"
import { ProductColor } from "@domain/ProductColor/ProductColor.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity, ManyToOne, OneToMany, RelationId,PrimaryGeneratedColumn } from "typeorm"

export type googleOAuthId = Brand<string, "GoogleOAuthId">

@Entity()
export class GoogleOAuth extends BaseEntity<googleOAuthId> {
	
	
     
	/**
	 *
	 * Following fields are for maintaining relations
	 */



	build(init: {
	
	}) {
	
		return this
	}
}
