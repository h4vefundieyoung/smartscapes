import { type FastifyInstance } from "fastify";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { multipartPlugin, type PluginOptions } from "./multipart.plugin.js";

describe("Multipart plugin", () => {
	it("should be a function", () => {
		assert.equal(typeof multipartPlugin, "function");
	});

	it("should accept plugin options", () => {
		const optionsMock = {
			maxFileSizeMB: 10,
		} as PluginOptions;

		assert.doesNotThrow(() => {
			multipartPlugin({} as FastifyInstance, optionsMock, () => {});
		});
	});
});
