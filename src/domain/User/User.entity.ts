import { Brand } from "@core/types"
import { BaseEntity } from "@domain/shared/BaseEntity"
import { Column, Entity,OneToOne } from "typeorm"
import { GoogleOAuth } from "./GoogleOAuth.entity"

export type UserId = Brand<string, "UserId">

@Entity()
export class User extends BaseEntity<UserId> {



	@OneToOne(()=>GoogleOAuth,{primary:true,cascade:true})
	@Column()
	googleOAuth: GoogleOAuth
}
