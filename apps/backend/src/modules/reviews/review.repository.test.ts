import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { type ReviewGetByIdResponseDto } from "./libs/types/types.js";
import { ReviewEntity } from "./review.entity.js";
import { ReviewModel } from "./review.model.js";
import { ReviewRepository } from "./review.repository.js";

describe("ReviewRepository", () => {
	let reviewRepository: ReviewRepository;
	let databaseTracker: Tracker;

	const mockReviewData: Parameters<typeof ReviewEntity.initialize>[0] = {
		content: "Test review content",
		createdAt: "2025-01-01T00:00:00Z",
		id: 1,
		likesCount: 10,
		poiId: 5,
		routeId: null,
		updatedAt: "2025-01-01T00:00:00Z",
		userId: 42,
	};

	beforeEach(() => {
		const database = knex({ client: MockClient });
		databaseTracker = createTracker(database);
		ReviewModel.knex(database);
		reviewRepository = new ReviewRepository(ReviewModel);
	});

	afterEach(() => {
		databaseTracker.reset();
	});

	it("create should create and return new review", async () => {
		const reviewEntity = ReviewEntity.initialize(mockReviewData);
		databaseTracker.on.insert("reviews").response([reviewEntity]);

		const result = await reviewRepository.create(reviewEntity);

		assert.deepStrictEqual(result, reviewEntity);
	});

	it("findAll should return DTO rows with nested user", async () => {
		const rows: ReviewGetByIdResponseDto[] = [
			{
				content: "Test review content",
				id: 1,
				likesCount: 10,
				poiId: 5,
				routeId: null,
				user: { firstName: "John", id: 42, lastName: "Doe" },
			},
		];

		type FakeQB = {
			execute(): Promise<ReviewGetByIdResponseDto[]>;
			modifiers(map: Record<string, (b: unknown) => void>): FakeQB;
			orderBy(col: string, directory: "asc" | "desc"): FakeQB;
			select(...cols: string[]): FakeQB;
			where(col: string, value: unknown): FakeQB;
			withGraphJoined(spec: string): FakeQB;
		};

		const fakeQb: FakeQB = {
			execute(): Promise<ReviewGetByIdResponseDto[]> {
				return Promise.resolve(rows);
			},
			modifiers(): FakeQB {
				return this;
			},
			orderBy(): FakeQB {
				return this;
			},
			select(): FakeQB {
				return this;
			},
			where(): FakeQB {
				return this;
			},
			withGraphJoined(): FakeQB {
				return this;
			},
		};

		const originalQuery = ReviewModel.query.bind(ReviewModel);

		try {
			(ReviewModel as unknown as { query: () => unknown }).query =
				(): unknown => fakeQb;

			const result = await reviewRepository.findAll(null);
			assert.deepStrictEqual(result, rows);
		} finally {
			(ReviewModel as unknown as { query: typeof originalQuery }).query =
				originalQuery;
		}
	});

	it("findAll should apply routeId filter", async () => {
		const filtered: ReviewGetByIdResponseDto[] = [
			{
				content: "By route",
				id: 2,
				likesCount: 0,
				poiId: null,
				routeId: 777,
				user: { firstName: "A", id: 7, lastName: "B" },
			},
		];

		type FakeQB = {
			_captured?: { column?: string; value?: unknown };
			execute(): Promise<ReviewGetByIdResponseDto[]>;
			modifiers(map: Record<string, (b: unknown) => void>): FakeQB;
			orderBy(col: string, directory: "asc" | "desc"): FakeQB;
			select(...cols: string[]): FakeQB;
			where(col: string, value: unknown): FakeQB;
			withGraphJoined(spec: string): FakeQB;
		};

		const fakeQb: FakeQB = {
			_captured: {},
			execute(): Promise<ReviewGetByIdResponseDto[]> {
				return Promise.resolve(filtered);
			},
			modifiers(): FakeQB {
				return this;
			},
			orderBy(): FakeQB {
				return this;
			},
			select(): FakeQB {
				return this;
			},
			where(col: string, value: unknown): FakeQB {
				this._captured = { column: col, value };

				return this;
			},
			withGraphJoined(): FakeQB {
				return this;
			},
		};

		const originalQuery = ReviewModel.query.bind(ReviewModel);

		try {
			(ReviewModel as unknown as { query: () => unknown }).query =
				(): unknown => fakeQb;

			const result = await reviewRepository.findAll({ routeId: 777 });

			assert.deepStrictEqual(result, filtered);
			assert.equal(fakeQb._captured?.column, "reviews.route_id");
			assert.equal(fakeQb._captured.value, 777);
		} finally {
			(ReviewModel as unknown as { query: typeof originalQuery }).query =
				originalQuery;
		}
	});
});
