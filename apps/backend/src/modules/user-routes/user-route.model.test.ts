import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

import { UserRouteModel } from "./user-route.model.js";

describe("UserRouteModel", () => {
	describe("tableName", () => {
		it("should return correct table name", () => {
			const { tableName } = UserRouteModel;

			assert.strictEqual(tableName, DatabaseTableName.USER_ROUTES);
		});
	});

	describe("properties", () => {
		it("should have all required properties", () => {
			const model = new UserRouteModel();

			assert.strictEqual("actualGeometry" in model, true);
			assert.strictEqual("completedAt" in model, true);
			assert.strictEqual("plannedGeometry" in model, true);
			assert.strictEqual("routeId" in model, true);
			assert.strictEqual("startedAt" in model, true);
			assert.strictEqual("status" in model, true);
			assert.strictEqual("userId" in model, true);
		});
	});
});
