import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { CategoryEntity } from "../categories/category.entity.js";
import { CategoryModel } from "../categories/category.model.js";
import { RouteCategoryRepository } from "./route-category.repository.js";

describe("RouteCategoryRepository", () => {
	let routeCategoryRepository: RouteCategoryRepository;
	let databaseTracker: Tracker;

	const mockRouteCategory: Parameters<typeof CategoryEntity.initialize>[0] = {
		id: 1,
		key: "popular",
		name: "Popular",
	};

	beforeEach(() => {
		const database = knex({ client: MockClient });

		databaseTracker = createTracker(database);

		CategoryModel.knex(database);

		routeCategoryRepository = new RouteCategoryRepository(CategoryModel);
	});

	afterEach(() => {
		databaseTracker.reset();
	});

	it("create should create and return new route category", async () => {
		const categoryEntity = CategoryEntity.initialize(mockRouteCategory);

		databaseTracker.on.insert("categories").response([categoryEntity]);

		const result = await routeCategoryRepository.create(categoryEntity);

		assert.deepStrictEqual(result, categoryEntity);
	});

	it("findAll should return all route categories", async () => {
		const routeCategoryEntities = [
			CategoryEntity.initialize(mockRouteCategory),
		];

		databaseTracker.on.select("categories").response(routeCategoryEntities);

		const result = await routeCategoryRepository.findAll();

		assert.deepStrictEqual(result, routeCategoryEntities);
	});

	it("findByName should return route category entity by name", async () => {
		const categoryEntity = CategoryEntity.initialize(mockRouteCategory);

		databaseTracker.on.select("categories").response([categoryEntity]);

		const result = await routeCategoryRepository.findByName(
			mockRouteCategory.name,
		);

		assert.deepStrictEqual(result, categoryEntity);
	});

	it("findByName should return null if no category found", async () => {
		databaseTracker.on.select("categories").response([]);

		const result = await routeCategoryRepository.findByName("Non Existent");

		assert.strictEqual(result, null);
	});
});
