import {
	type CollectionResult,
	type Service,
	type UserAuthResponseDto,
} from "~/libs/types/types.js";
import { ReviewEntity } from "~/modules/reviews/review.entity.js";
import { type ReviewRepository } from "~/modules/reviews/review.repository.js";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { type RouteService } from "../routes/route.service.js";
import {
	type ReviewCreatePayload,
	type ReviewGetByIdResponseDto,
	type ReviewSearchQuery,
} from "./libs/types/types.js";

class ReviewService implements Service {
	private pointsOfInterestService: PointsOfInterestService;

	private reviewRepository: ReviewRepository;

	private routeService: RouteService;

	public constructor(
		reviewRepository: ReviewRepository,
		pointsOfInterestService: PointsOfInterestService,
		routeService: RouteService,
	) {
		this.pointsOfInterestService = pointsOfInterestService;
		this.reviewRepository = reviewRepository;
		this.routeService = routeService;
	}

	public async create(
		payload: ReviewCreatePayload & {
			user: Pick<
				UserAuthResponseDto,
				"avatarUrl" | "firstName" | "id" | "lastName"
			>;
		},
	): Promise<ReviewGetByIdResponseDto> {
		if (payload.poiId) {
			await this.ensurePoiExists(payload.poiId);
		}

		if (payload.routeId) {
			await this.ensureRouteExists(payload.routeId);
		}

		const createReviewEntity = ReviewEntity.initializeNew({
			content: payload.content,
			likesCount: 0,
			poiId: payload.poiId ?? null,
			routeId: payload.routeId ?? null,
			userId: payload.userId,
		});

		const reviewEntity = await this.reviewRepository.create(createReviewEntity);

		const review = reviewEntity.toObject();

		return {
			content: review.content,
			id: review.id,
			likesCount: review.likesCount,
			poiId: review.poiId,
			routeId: review.routeId,
			user: {
				avatarUrl: payload.user.avatarUrl,
				firstName: payload.user.firstName,
				id: payload.user.id,
				lastName: payload.user.lastName,
			},
		};
	}

	public async findAll(
		options: null | ReviewSearchQuery,
	): Promise<CollectionResult<ReviewGetByIdResponseDto>> {
		const routeId = options?.routeId;

		if (routeId !== undefined) {
			await this.ensureRouteExists(routeId);
		}

		const reviews = await this.reviewRepository.findAll(options);

		const items: ReviewGetByIdResponseDto[] = reviews.map((review) => ({
			content: review.content,
			id: review.id,
			likesCount: review.likesCount,
			poiId: review.poiId,
			routeId: review.routeId,
			user: {
				avatarUrl: review.user.avatar?.url ?? null,
				firstName: review.user.firstName,
				id: review.user.id,
				lastName: review.user.lastName,
			},
		}));

		return { items };
	}

	private async ensurePoiExists(id: number): Promise<void> {
		await this.pointsOfInterestService.findById(id);
	}

	private async ensureRouteExists(id: number): Promise<void> {
		await this.routeService.findById(id);
	}
}

export { ReviewService };
