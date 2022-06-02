import { randUserName } from "@ngneat/falso"

export function generateAdminUsername() {
	return randUserName().slice(0, 20)
}
