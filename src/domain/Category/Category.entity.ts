import { Brand } from "@core/types"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm"

export type CategoryId = Brand<string, "CategoryId">

@Entity()
export class Category extends BaseEntity<CategoryId> {
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

	@ManyToOne(() => Category, (category) => category.subCategories, { nullable: true })
	parentCategory!: Category | null

	@RelationId((category: Category) => category.parentCategory)
	parentCategoryIdId!: Category["id"] | null

	@OneToMany(() => Category, (category) => category.parentCategory)
	subCategories!: Category[]

	build(init: {
		title: string
		categoryUrl?: string
		description?: string
		parentCategory?: Category | null
	}) {
		this.parentCategory = init.parentCategory ?? null
		this.title = init.title
		this.categoryUrl =
			init.categoryUrl || this.title.toLowerCase().split(" ").join("-")
		this.description = init.description ?? ""

		return this
	}
}
