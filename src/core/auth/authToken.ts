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
export type RefreshToken = Brand<string, "RefreshToken">

export function createAuthTokens(payload: AuthPayload) {
	const accessToken = jwt.sign(payload, secret, {
		issuer,
		expiresIn: `${expiresInHours}h`,
		subject,
	}) as AccessToken
	const refreshToken: RefreshToken | null = null

	return { accessToken, refreshToken }
}

export function validateAccessToken(accessToken: AccessToken): AuthPayload {
	try {
		const { role, id } = jwt.verify(accessToken, secret, { issuer }) as AuthPayload
		return { role, id } as AuthPayload
	} catch (err) {
		if (err instanceof JsonWebTokenError) {
			throw new UnauthorisedError("Invalid access token")
		}
		throw err
	}
}
