import { HTTPCode } from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type APIHandlerOptions } from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type CategoryGetAllItemResponseDto } from "~/modules/categories/categories.js";

import { CategoryController } from "./category.controller.js";
import { type CategoryService } from "./category.service.js";
import { type CategoryCreateRequestDto } from "./libs/types/types.js";

describe("CategoryController", () => {
	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	const mockCategory: CategoryGetAllItemResponseDto = {
		id: 1,
		name: "Popular",
	};

	it("create should create and return new category", async () => {
		const categoryService = {
			create: (() =>
				Promise.resolve(mockCategory)) as CategoryService["create"],
		} as CategoryService;

		const categoryController = new CategoryController(
			mockLogger,
			categoryService,
		);

		const requestOptions = {
			body: {
				name: mockCategory.name,
			},
		} as APIHandlerOptions<{ body: CategoryCreateRequestDto }>;

		const result = await categoryController.create(requestOptions);

		assert.deepStrictEqual(result, {
			payload: { data: mockCategory },
			status: HTTPCode.CREATED,
		});
	});

	it("findAll should return all categories", async () => {
		const categoryService = {
			findAll: (() =>
				Promise.resolve({
					items: [mockCategory],
				})) as CategoryService["findAll"],
		} as CategoryService;

		const categoryController = new CategoryController(
			mockLogger,
			categoryService,
		);

		const result = await categoryController.findAll();

		assert.deepStrictEqual(result, {
			payload: { data: [mockCategory] },
			status: HTTPCode.OK,
		});
	});
});
