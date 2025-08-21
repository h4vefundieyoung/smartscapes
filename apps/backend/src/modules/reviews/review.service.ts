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
		payload: Pick<
			UserAuthResponseDto,
			"avatarUrl" | "firstName" | "id" | "lastName"
		> &
			ReviewCreatePayload,
	): Promise<ReviewGetByIdResponseDto> {
		if (payload.poiId) {
			await this.ensurePoiExists(payload.poiId);
		}

		if (payload.routeId) {
			await this.ensureRouteExists(payload.routeId);
		}

		const reviewEntity = ReviewEntity.initializeNew({
			content: payload.content,
			likesCount: 0,
			poiId: payload.poiId ?? null,
			routeId: payload.routeId ?? null,
			userId: payload.userId,
		});

		const created = await this.reviewRepository.create(reviewEntity);

		const base = created.toObject();

		return {
			content: base.content,
			id: base.id,
			likesCount: base.likesCount,
			poiId: base.poiId,
			routeId: base.routeId,
			user: {
				avatarUrl: payload.avatarUrl,
				firstName: payload.firstName,
				id: payload.id,
				lastName: payload.lastName,
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

		const items = await this.reviewRepository.findAll(options);

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
