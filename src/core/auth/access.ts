import { ForbiddenError } from "@core/http"
import { Request } from "express"
import { AccessToken, validateAccessToken } from "./authToken"
import { AuthRole } from "./types"

function getAccessToken(authHeaderValue: string) {
	const [_bearer, accessToken] = authHeaderValue.split(" ")
	if (!_bearer || !accessToken) throw new ForbiddenError("Access token is required")
	return accessToken as AccessToken
}

function getAuth(req: Request) {
	const authHeaderValue = req.header("Authorization")
	if (!authHeaderValue) throw new ForbiddenError("Authentication is required")

	const accessToken = getAccessToken(authHeaderValue)
	return validateAccessToken(accessToken)
}

export function authenticateRequest(req: Request, allowedRoles?: AuthRole[]) {
	const auth = getAuth(req)
	if (allowedRoles && !allowedRoles.includes(auth.role)) {
		throw new ForbiddenError(`${auth.role} does not have access for this operation`)
	}
	return auth
}
