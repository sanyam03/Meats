import { Brand } from "@core/types"
import { Product } from "@domain/Product/Product.entity"
import { BaseEntity } from "@domain/shared/BaseEntity"
import { generateUrlFromTitle } from "@utils/helpers"
import "reflect-metadata"
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm"

export type CategoryId = Brand<string, "CategoryId">

@Entity()
export class Category extends BaseEntity<CategoryId> {
	@ManyToOne(() => Category, (category) => category.subCategories, { nullable: true })
	parentCategory!: Category | null

	@RelationId((category: Category) => category.parentCategory)
	parentCategoryId!: Category["id"] | null

	@Column({ type: "varchar", length: 100, unique: true })
	title!: string

	@Column({ type: "varchar", length: 100, unique: true })
	categoryUrl!: string

	@Column({ type: "varchar", length: 1000 })
	description!: string

	@Column({ type: "varchar", length: 200, nullable: true })
	thumbnailUrl!: string | null

	@Column({ type: "varchar", length: 200, nullable: true })
	coverPhotoUrl!: string | null

	/**
	 *
	 * Following fields should be auto calculated
	 */

	@Column({ default: 0 })
	countSubCategories!: number

	@Column({ default: 0 })
	countPublishedSubCategories!: number

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

	@OneToMany(() => Category, (category) => category.parentCategory)
	subCategories!: Category[]

	@OneToMany(() => Product, (product) => product.category)
	products!: Product[]

	build(init: {
		title: string
		description?: string
		parentCategory?: Category | null
	}) {
		this.parentCategory = init.parentCategory ?? null
		this.title = init.title
		this.categoryUrl = generateUrlFromTitle(init.title)
		this.description = init.description ?? ""

		return this
	}
}
