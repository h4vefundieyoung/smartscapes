import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { ReviewEntity } from "./review.entity.js";
import { ReviewModel } from "./review.model.js";
import { ReviewRepository } from "./review.repository.js";

describe("ReviewRepository (knex-mock-client, no fakeQB)", () => {
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
		const database = knex({ client: MockClient, dialect: "pg" });
		databaseTracker = createTracker(database);

		databaseTracker.on.any("information_schema").response([]);
		databaseTracker.on.any("pg_catalog").response([]);

		ReviewModel.knex(database);
		reviewRepository = new ReviewRepository(ReviewModel);
	});

	afterEach(() => {
		databaseTracker.reset();
	});

	it("create should create and return new review", async () => {
		const entity = ReviewEntity.initialize(mockReviewData);
		databaseTracker.on.insert("reviews").response([entity]);
		const created = await reviewRepository.create(entity);
		assert.deepStrictEqual(created, entity);
	});

	it("findAll should return DTO rows with nested user", async () => {
		const row = {
			content: "Test review content",
			id: 1,
			likesCount: 10,
			poiId: 5,
			routeId: null,
			"user:avatar:url": "url",
			"user:firstName": "John",
			"user:id": 42,
			"user:lastName": "Doe",
		};

		databaseTracker.on.select("reviews").response([row]);

		const result = await reviewRepository.findAll(null);

		const actual = result.map((r) => ({
			content: r.content,
			id: r.id,
			likesCount: r.likesCount,
			poiId: r.poiId,
			routeId: r.routeId,
			user: {
				avatar: r.user.avatar ? { url: r.user.avatar.url } : null,
				firstName: r.user.firstName,
				id: r.user.id,
				lastName: r.user.lastName,
			},
		}));

		assert.deepStrictEqual(actual, [
			{
				content: "Test review content",
				id: 1,
				likesCount: 10,
				poiId: 5,
				routeId: null,
				user: {
					avatar: { url: "url" },
					firstName: "John",
					id: 42,
					lastName: "Doe",
				},
			},
		]);
	});

	it("findAll should apply routeId filter", async () => {
		const routeId = 777;

		const row = {
			content: "By route",
			id: 2,
			likesCount: 0,
			poiId: null,
			routeId,
			"user:avatar:url": "url",
			"user:firstName": "A",
			"user:id": 7,
			"user:lastName": "B",
		};

		databaseTracker.on.select("reviews").response([row]);

		const reviews = await reviewRepository.findAll({ routeId });

		const actual = reviews.map((review) => ({
			content: review.content,
			id: review.id,
			likesCount: review.likesCount,
			poiId: review.poiId,
			routeId: review.routeId,
			user: {
				avatar: review.user.avatar ? { url: review.user.avatar.url } : null,
				firstName: review.user.firstName,
				id: review.user.id,
				lastName: review.user.lastName,
			},
		}));

		assert.deepStrictEqual(actual, [
			{
				content: "By route",
				id: 2,
				likesCount: 0,
				poiId: null,
				routeId,
				user: {
					avatar: { url: "url" },
					firstName: "A",
					id: 7,
					lastName: "B",
				},
			},
		]);
	});
});
