import { AdminId } from "@domain/Admin/Admin.entity"

export enum AuthRole {
	ADMIN = "Admin",
	USER = "User",
}

interface AdminAuthPayload {
	role: AuthRole.ADMIN
	id: AdminId
}

export type AuthPayload = AdminAuthPayload
