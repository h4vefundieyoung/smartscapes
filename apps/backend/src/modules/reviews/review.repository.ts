import { SortingOrder } from "~/libs/enums/sorting-order.enum.js";
import { type Repository } from "~/libs/types/types.js";
import { ReviewEntity } from "~/modules/reviews/review.entity.js";
import { type ReviewModel } from "~/modules/reviews/review.model.js";

import { type ReviewGetAllSearchQuery } from "./libs/types/types.js";

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
	): Promise<ReviewEntity[]> {
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

		const rows = await queryBuilder.execute();

		return rows.map((r) =>
			ReviewEntity.initializeList({
				content: r.content,
				id: r.id,
				likesCount: r.likesCount,
				poiId: r.poiId,
				routeId: r.routeId,
				user: {
					avatarUrl: r.user.avatar?.url ?? null,
					firstName: r.user.firstName,
					id: r.user.id,
					lastName: r.user.lastName,
				},
				userId: r.userId,
			}),
		);
	}
}

export { ReviewRepository };
