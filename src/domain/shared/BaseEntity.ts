import { Brand } from "@core/types"
import { randomUUID } from "crypto"
import "reflect-metadata"
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity<IdBrand extends Brand<string, string>> {
	@PrimaryColumn({ type: "uuid" })
	id: IdBrand

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	constructor() {
		this.id = randomUUID() as IdBrand
	}
}
