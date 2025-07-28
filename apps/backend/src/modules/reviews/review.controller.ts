import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type ReviewService } from "~/modules/reviews/review.service.js";

import {
	type ReviewRequestDto,
	type ReviewResponseDto,
} from "./libs/types/types.js";
import { reviewCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewRequestDto:
 *       type: object
 *       required:
 *         - userId
 *         - content
 *       properties:
 *         userId:
 *           type: integer
 *         content:
 *           type: string
 *           example: "This is a review content."
 *         likesCount:
 *           type: integer
 *         routeId:
 *           type: integer
 *           nullable: true
 *         poiId:
 *           type: integer
 *           nullable: true
 *
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         likesCount:
 *           type: integer
 *         poiId:
 *           type: integer
 *           nullable: true
 *         routeId:
 *           type: integer
 *           nullable: true
 *         userId:
 *           type: integer
 *
 *     ReviewResponseDto:
 *        type: object
 *        $ref: '#/components/schemas/Review'
 */

class ReviewController extends BaseController {
	private reviewService: ReviewService;

	public constructor(logger: Logger, reviewService: ReviewService) {
		super(logger, APIPath.REVIEWS);
		this.reviewService = reviewService;

		this.addRoute({
			handler: this.create.bind(this),
			method: "POST",
			path: "/",
			validation: {
				body: reviewCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: this.findAll.bind(this),
			method: "GET",
			path: "/",
		});
	}

	/**
	 * @swagger
	 * /reviews:
	 *   post:
	 *     tags:
	 *       - Reviews
	 *     summary: Create a new review
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ReviewRequestDto'
	 *     responses:
	 *       201:
	 *         description: Review created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                  $ref: '#/components/schemas/ReviewResponseDto'
	 */

	public async create(
		options: APIHandlerOptions<{ body: ReviewRequestDto }>,
	): Promise<APIHandlerResponse<ReviewResponseDto>> {
		const { body } = options;
		const review = await this.reviewService.create(body);

		return {
			payload: { data: review },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /reviews:
	 *   get:
	 *     tags:
	 *       - Reviews
	 *     summary: Retrieve all reviews
	 *     responses:
	 *       200:
	 *         description: A list of reviews
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/Review'
	 */
	public async findAll(): Promise<APIHandlerResponse<ReviewResponseDto[]>> {
		const { items } = await this.reviewService.findAll();

		return {
			payload: { data: items },
			status: HTTPCode.OK,
		};
	}
}

export { ReviewController };
