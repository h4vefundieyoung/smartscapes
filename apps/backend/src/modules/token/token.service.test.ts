import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type Config } from "~/libs/modules/config/config.js";
import { type EnvironmentSchema } from "~/libs/modules/config/libs/types/types.js";

import { TokenService } from "./token.service.js";

describe("Token service", () => {
	const mockENV: Pick<EnvironmentSchema, "AUTH"> = {
		AUTH: {
			JWT_SECRET: "mock secret",
		},
	};

	const userId = 1;

	const mockConfig = {
		ENV: mockENV as Config["ENV"],
	} as Config;

	it("create should return token", async () => {
		const tokenService = new TokenService({ config: mockConfig });

		const token = await tokenService.create(userId);

		const decodedId = await tokenService.verify(token);
		assert.equal(decodedId, userId);
	});

	it("verify should throw error if token is invalid", async () => {
		const tokenService = new TokenService({ config: mockConfig });

		const invalidToken = "invalid token";

		try {
			await tokenService.verify(invalidToken);
			assert.fail("expected exception not thrown");
		} catch (error) {
			assert.ok(error instanceof Error);
		}
	});
});
