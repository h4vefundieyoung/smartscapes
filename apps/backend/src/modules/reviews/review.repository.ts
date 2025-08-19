import { type Repository } from "~/libs/types/types.js";
import { ReviewEntity } from "~/modules/reviews/review.entity.js";
import { type ReviewModel } from "~/modules/reviews/review.model.js";

import {
	type ReviewGetByIdResponseDto,
	type ReviewSearchQuery,
} from "./libs/types/types.js";

class ReviewRepository implements Repository {
	private reviewModel: typeof ReviewModel;

	public constructor(reviewModel: typeof ReviewModel) {
		this.reviewModel = reviewModel;
	}

	public async create(entity: ReviewEntity): Promise<ReviewEntity> {
		const { content, likesCount, poiId, routeId, userId } =
			entity.toNewObject();

		const review = await this.reviewModel
			.query()
			.insert({ content, likesCount, poiId, routeId, userId })
			.returning("*")
			.execute();

		return ReviewEntity.initialize(review);
	}

	public async findAll(
		options: null | ReviewSearchQuery,
	): Promise<ReviewGetByIdResponseDto[]> {
		const q = this.reviewModel
			.query()
			.withGraphJoined("user(selectBasic)")
			.modifiers({
				selectBasic(b) {
					b.select("id", "first_name as firstName", "last_name as lastName");
				},
			})
			.select(
				"reviews.id as id",
				"reviews.content as content",
				"reviews.likes_count as likesCount",
				"reviews.poi_id as poiId",
				"reviews.route_id as routeId",
			)
			.orderBy("reviews.id", "desc");

		const routeId = options?.routeId;

		if (routeId !== undefined) {
			q.where("reviews.route_id", routeId);
		}

		const rows = await q.execute();

		return rows as ReviewGetByIdResponseDto[];
	}
}

export { ReviewRepository };
