import { expect, request, test } from "@playwright/test";
import {
	type APIErrorResponse,
	type APIResponse,
	HTTPCode,
	type UserSignInResponseDto,
} from "@smartscapes/shared";

import { ApiController } from "../api/controllers/api-controller.js";
import { signupSchema } from "../api/schemas/signup-schema.js";
import { signupTestDataSet } from "../api/test-data/auth/register-test-data.js";
import { expectToMatchSchema } from "../helpers/schema-validator.js";

let api: ApiController;

test.beforeAll("Create context", async () => {
	const requestContext = await request.newContext();
	api = new ApiController(requestContext);
});

test.describe("Check register", () => {
	for (const { expectedResponse, label, payload } of signupTestDataSet) {
		test(label, async () => {
			const response = await api.auth.register(payload);

			const responseBody = (await response.json()) as
				| APIErrorResponse
				| APIResponse<UserSignInResponseDto>;

			expect(response.status()).toBe(expectedResponse.status);

			if (response.status() === HTTPCode.CREATED) {
				expectToMatchSchema(responseBody, signupSchema);
			} else {
				expect(expectedResponse.errorMessage).toContain(
					(responseBody as APIErrorResponse).error.message,
				);
			}
		});
	}
});
