import { expect } from "chai"
import _ from "lodash"
import { HttpMethod, HttpStatusCode } from "@core/http"
import { httpAgent } from "./setup"

export async function httpApiRequest({
	method = "post",
	endpoint,
	body,
	query,
	bearerToken,
	expectedStatusCode = HttpStatusCode.OK,
}: {
	method?: HttpMethod
	endpoint: string
	body?: string | object
	query?: string | object
	bearerToken?: string
	expectedStatusCode?: HttpStatusCode
}): Promise<any> {
	const client = httpAgent[method](endpoint)

	if (bearerToken) client.set("Authorization", `Bearer ${bearerToken}`)
	if (body) client.send(body)
	if (query) client.query(query)

	const response = await client
	expect(response.status).equal(
		expectedStatusCode,
		`${response.body?.name}: ${response.body?.message}  ${response.body?.stack}`,
	)

	return response.body
}
