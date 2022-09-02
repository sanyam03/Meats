import * as yup from "yup"
import { AuthRole, createAuthTokens } from "@core/auth"
import { HttpRestApi, UnprocessableEntityError } from "http-rest-api"
import { verifyGoogleOAuthIdToken } from "../../helpers/googleOAuth/verifyGoogleOAuthIdToken"
import { getOrCreateUserWithGoogleOAuth } from "../../services/user/getOrCreateUserWithGoogleOAuth"
import { parseYupSchema } from "apis/validators"

const bodySchema = yup
	.object({ idToken: yup.string()})
	.strict()

export const apiUserGoogleAuthLogin = new HttpRestApi({
	method: "post",
	path: "/user/googleAuth",
	handler: async ({req}) => {
		const {idToken} = await parseYupSchema(bodySchema,req.body)
		const { email, googleUserId, name } = await verifyGoogleOAuthIdToken(idToken)
		const user = await getOrCreateUserWithGoogleOAuth({
			googleUserId,
			name,
			email,
		})


		return createAuthTokens({ role:AuthRole.USER, id: user.id })
		
	},
})
