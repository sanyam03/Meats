import { AdminId } from "@domain/Admin/Admin.entity"

export enum AuthRole {
	DEVELOPER = "Developer",
	ADMIN = "Admin",
	GUEST = "Guest",
	USER = "User",
}

interface DeveloperAuthPayload {
	role: AuthRole.DEVELOPER
	id: string // use developer username
}

interface AdminAuthPayload {
	role: AuthRole.ADMIN
	id: AdminId
}

interface GuestAuthPayload {
	role: AuthRole.GUEST
	id: string // client generated uuid
}

interface UserAuthPayload {
	role: AuthRole.USER
	id: string // user session id
}

export type AuthPayload =
	| DeveloperAuthPayload
	| AdminAuthPayload
	| GuestAuthPayload
	| UserAuthPayload
