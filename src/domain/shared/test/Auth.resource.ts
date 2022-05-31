import { randAlphaNumeric, randPassword } from "@ngneat/falso"
import _ from "lodash"

export function randomInvalidAuthToken() {
	return randAlphaNumeric({ length: _.random(20, 100) }).join(",")
}

export function randomPassword() {
	return randPassword({ size: _.random(5, 30) })
}

export function randomInvalidPassword() {
	return randPassword({ size: _.random(1, 4) })
}
