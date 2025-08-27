import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/modules/http/http.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import { CategoryService } from "./category.service.js";
import { CategoryExceptionMessage } from "./libs/enums/enums.js";
import { CategoryError } from "./libs/exceptions/exceptions.js";

describe("CategoryService", () => {
	const mockCategory: Parameters<typeof CategoryEntity.initialize>[0] = {
		createdAt: "2024-01-01T00:00:00Z",
		id: 1,
		key: "popular",
		name: "Popular",
	};

	it("create should return new category", async () => {
		const categoryEntity = CategoryEntity.initialize(mockCategory);

		const categoryRepository = {
			create: (() =>
				Promise.resolve(categoryEntity)) as CategoryRepository["create"],
			findByKey: (() =>
				Promise.resolve(null)) as CategoryRepository["findByKey"],
		} as CategoryRepository;

		const categoryService = new CategoryService(categoryRepository);

		const result = await categoryService.create({
			name: mockCategory.name,
		});

		assert.deepStrictEqual(result, mockCategory);
	});

	it("create should throw exception if category with such key already exists", async () => {
		const categoryEntity = CategoryEntity.initialize(mockCategory);

		const categoryRepository = {
			create: (() =>
				Promise.resolve(categoryEntity)) as CategoryRepository["create"],
			findByKey: (() =>
				Promise.resolve(categoryEntity)) as CategoryRepository["findByKey"],
		} as CategoryRepository;

		const categoryService = new CategoryService(categoryRepository);

		try {
			await categoryService.create({
				name: mockCategory.name,
			});
			assert.fail("expected exception not thrown");
		} catch (error) {
			assert.ok(error instanceof CategoryError);
			assert.equal(error.message, CategoryExceptionMessage.ALREADY_EXISTS);
			assert.equal(error.status, HTTPCode.CONFLICT);
		}
	});

	it("findAll should return all categories", async () => {
		const categoryEntity = CategoryEntity.initialize(mockCategory);

		const categoryRepository = {
			findAll: (() =>
				Promise.resolve({
					items: [categoryEntity],
					total: 1,
				})) as CategoryRepository["findAll"],
		} as CategoryRepository;

		const categoryService = new CategoryService(categoryRepository);

		const result = await categoryService.findAll(null);

		assert.deepStrictEqual(result, {
			items: [categoryEntity.toObject()],
			meta: {
				currentPage: 1,
				itemsPerPage: 1,
				total: 1,
				totalPages: 1,
			},
		});
	});

	it("findByName should return category with corresponding name", async () => {
		const categoryEntity = CategoryEntity.initialize(mockCategory);

		const categoryRepository = {
			findByName: (() =>
				Promise.resolve(categoryEntity)) as CategoryRepository["findByName"],
		} as CategoryRepository;

		const categoryService = new CategoryService(categoryRepository);

		const result = await categoryService.findByName(mockCategory.name);

		assert.deepStrictEqual(result, categoryEntity.toObject());
	});

	it("findByName should throw exception if no category found", async () => {
		const categoryRepository = {
			findByName: (() =>
				Promise.resolve(null)) as CategoryRepository["findByName"],
		} as CategoryRepository;

		const categoryService = new CategoryService(categoryRepository);

		try {
			await categoryService.findByName("Non Existent");
			assert.fail("expected exception not thrown");
		} catch (error) {
			assert.ok(error instanceof CategoryError);
			assert.equal(error.message, CategoryExceptionMessage.NOT_FOUND);
			assert.equal(error.status, HTTPCode.NOT_FOUND);
		}
	});
});
