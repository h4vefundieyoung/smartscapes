import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type APIHandlerOptions } from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/libs/types/types.js";

import { GroupEntity } from "../groups/group.entity.js";
import { PermissionEntity } from "../permission/permission.entity.js";
import {
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
	type ReviewSearchQuery,
} from "./libs/types/types.js";
import { ReviewController } from "./review.controller.js";
import { type ReviewService } from "./review.service.js";

describe("ReviewController", (): void => {
	const mockPermission = PermissionEntity.initialize({
		id: 1,
		key: "read",
		name: "Read",
	});

	const mockGroup = GroupEntity.initializeWithPermissions({
		id: 2,
		key: "users",
		name: "Users",
		permissions: [mockPermission.toObject()],
	});

	const mockLogger: Logger = {
		debug: (): void => {},
		error: (): void => {},
		info: (): void => {},
		warn: (): void => {},
	};

	const mockUser: UserAuthResponseDto = {
		email: "test@example.com",
		firstName: "John",
		group: mockGroup.toObject(),
		groupId: mockGroup.toObject().id,
		id: 1,
		isVisibleProfile: true,
		lastName: "Doe",
	};

	const mockReviewDto: ReviewGetByIdResponseDto = {
		content: "content",
		id: 1,
		likesCount: 5,
		poiId: null,
		routeId: 10,
		user: {
			firstName: mockUser.firstName,
			id: mockUser.id,
			lastName: mockUser.lastName,
		},
	};

	it("findAll should return all reviews", async (): Promise<void> => {
		const reviews: ReviewGetByIdResponseDto[] = [mockReviewDto];

		const mockFindAll: ReviewService["findAll"] = () =>
			Promise.resolve({ items: reviews });

		const reviewService = { findAll: mockFindAll } as ReviewService;
		const reviewController = new ReviewController(mockLogger, reviewService);

		const options: APIHandlerOptions<{ query: null | ReviewSearchQuery }> = {
			body: undefined as never,
			params: {},
			query: null,
			user: mockUser,
		};

		const result = await reviewController.findAll(options);

		assert.deepStrictEqual(result, {
			payload: { data: reviews },
			status: HTTPCode.OK,
		});
	});

	it("create should create a review and return it", async (): Promise<void> => {
		const returned: ReviewGetByIdResponseDto = mockReviewDto;

		const mockCreate: ReviewService["create"] = () => Promise.resolve(returned);

		const reviewService = { create: mockCreate } as ReviewService;
		const reviewController = new ReviewController(mockLogger, reviewService);

		const result = await reviewController.create({
			body: {
				content: returned.content,
				poiId: returned.poiId,
				routeId: returned.routeId,
			},
			params: {},
			query: {},
			user: {},
		} as APIHandlerOptions<{ body: ReviewRequestDto }>);

		assert.deepStrictEqual(result, {
			payload: { data: returned },
			status: HTTPCode.CREATED,
		});
	});
});
