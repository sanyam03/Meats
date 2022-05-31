import { jwtConfigs, serverConfigs } from "@core/configs"
import { Brand } from "@core/types"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { UnauthorisedError } from "../http"
import { AuthPayload } from "./types"

const secret = jwtConfigs.secret
const issuer = serverConfigs.appName
const subject = "auth-token"
const expiresInHours = 12

export type AccessToken = Brand<string, "AccessToken">

export function createAuthToken(payload: AuthPayload) {
	return jwt.sign(payload, secret, {
		issuer,
		expiresIn: `${expiresInHours}h`,
		subject,
	}) as AccessToken
}

export function validateAuthToken(accessToken: AccessToken): AuthPayload {
	try {
		const { role, id } = jwt.verify(accessToken, secret, { issuer }) as AuthPayload
		return { role, id }
	} catch (err) {
		if (err instanceof JsonWebTokenError) {
			throw new UnauthorisedError("Invalid access token")
		}
		throw err
	}
}
