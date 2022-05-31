import { Brand } from "@core/types"
import { BaseEntity } from "@domain/shared/BaseEntity"
import "reflect-metadata"
import { Column, Entity } from "typeorm"

export type CategoryId = Brand<string, "CategoryId">

@Entity()
export class Category extends BaseEntity<CategoryId> {
	@Column({ type: "varchar", length: 50, unique: true })
	title!: string

	@Column({ type: "varchar", length: 200, nullable: true })
	thumbnailUrl!: string | null

	build({ title }: { title: string }) {
		this.title = title
		return this
	}
}
