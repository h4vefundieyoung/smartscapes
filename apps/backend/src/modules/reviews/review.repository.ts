import { SortingOrder } from "~/libs/enums/sorting-order.enum.js";
import { type Repository } from "~/libs/types/types.js";
import { ReviewEntity } from "~/modules/reviews/review.entity.js";
import { type ReviewModel } from "~/modules/reviews/review.model.js";

import {
	type ReviewGetAllItemResponseDto,
	type ReviewGetAllSearchQuery,
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
		options: null | ReviewGetAllSearchQuery,
	): Promise<ReviewGetAllItemResponseDto[]> {
		const { routeId } = options ?? {};

		const queryBuilder = this.reviewModel
			.query()
			.withGraphJoined("[user(selectUser).avatar(selectAvatar)]")
			.modifiers({
				selectAvatar(builder) {
					builder.select("files.url as url");
				},
				selectUser(builder) {
					builder.select(
						"users.id",
						"users.first_name as firstName",
						"users.last_name as lastName",
					);
				},
			})
			.select(
				"reviews.id as id",
				"reviews.content as content",
				"reviews.likes_count as likesCount",
				"reviews.poi_id as poiId",
				"reviews.route_id as routeId",
			)
			.orderBy("reviews.createdAt", SortingOrder.DESC);

		if (routeId) {
			queryBuilder.where("reviews.route_id", routeId);
		}

		return await queryBuilder.execute();
	}
}

export { ReviewRepository };
