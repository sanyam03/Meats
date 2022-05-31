import { Brand } from "@core/types"
import { BaseEntity } from "@domain/shared/BaseEntity"
import { createHash, verifyHash } from "@utils/hash"
import "reflect-metadata"
import { Column, Entity } from "typeorm"

export type AdminId = Brand<string, "AdminId">

@Entity()
export class Admin extends BaseEntity<AdminId> {
	@Column({ type: "varchar", length: 30, unique: true })
	username!: string

	@Column({ type: "varchar", length: 256 })
	private hashedPassword!: string

	async build({ username, password }: { username: string; password: string }) {
		this.username = username.toLowerCase()
		this.hashedPassword = await createHash(password)

		return this
	}

	async validatePassword(password: string) {
		return await verifyHash(password, this.hashedPassword)
	}
}
