import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

import { FileModel } from "./files.model.js";

describe("FileModel", () => {
	describe("tableName", () => {
		it("should return correct table name", () => {
			assert.equal(FileModel.tableName, DatabaseTableName.FILES);
		});
	});

	describe("properties", () => {
		it("should have required properties", () => {
			const model = new FileModel();

			assert.ok("contentType" in model);
			assert.ok("url" in model);
		});
	});
});
