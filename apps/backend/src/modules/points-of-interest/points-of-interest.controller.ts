import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PointsOfInterestService } from "~/modules/points-of-interest/points-of-interest.service.js";

import {
	type PointsOfInterestRequestDto,
	type PointsOfInterestResponseDto,
	type PointsOfInterestSearchQuery,
} from "./libs/types/type.js";
import {
	pointOfInterestCreateValidationSchema,
	pointOfInterestUpdateValidationSchema,
	pointsOfInterestSearchQueryValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

type PointsOfInterestFindAllOptions =
	| APIHandlerOptions
	| PointsOfInterestFindAllOptionsQuery;

type PointsOfInterestFindAllOptionsQuery = APIHandlerOptions<{
	query?: PointsOfInterestSearchQuery;
}>;

/**
 * @swagger
 * components:
 *   schemas:
 *     PointsOfInterestLocation:
 *       type: object
 *       required:
 *         - coordinates
 *         - type
 *       properties:
 *         coordinates:
 *           type: array
 *           items:
 *             type: number
 *           example: [30.5234, 50.4501]
 *         type:
 *           type: string
 *           example: "Point"
 *
 *     PointsOfInterestRequestDto:
 *       type: object
 *       required:
 *         - location
 *         - name
 *       properties:
 *         location:
 *           $ref: '#/components/schemas/PointsOfInterestLocation'
 *         name:
 *           type: string
 *           example: "Central Park"
 *
 *     PointsOfInterestResponseDto:
 *       type: object
 *       required:
 *         - id
 *         - location
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         location:
 *           $ref: '#/components/schemas/PointsOfInterestLocation'
 *         name:
 *           type: string
 *           example: "Central Park"
 *
 */

class PointsOfInterestController extends BaseController {
	private pointsOfInterestService: PointsOfInterestService;

	public constructor(
		logger: Logger,
		pointsOfInterestService: PointsOfInterestService,
	) {
		super(logger, APIPath.POINTS_OF_INTEREST);
		this.pointsOfInterestService = pointsOfInterestService;

		this.addRoute({
			handler: this.create.bind(this),
			method: "POST",
			path: "/",
			validation: {
				body: pointOfInterestCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: this.delete.bind(this),
			method: "DELETE",
			path: "/:id",
		});

		this.addRoute({
			handler: this.findById.bind(this),
			method: "GET",
			path: "/:id",
		});

		this.addRoute({
			handler: this.findAll.bind(this),
			method: "GET",
			path: "/",
			validation: {
				query: pointsOfInterestSearchQueryValidationSchema,
			},
		});

		this.addRoute({
			handler: this.patch.bind(this),
			method: "PATCH",
			path: "/:id",
			validation: {
				body: pointOfInterestUpdateValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /points-of-interest:
	 *   post:
	 *     security:
	 *      - bearerAuth: []
	 *     tags:
	 *       - Points of Interest
	 *     summary: Create a new point of interest
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/PointsOfInterestRequestDto'
	 *     responses:
	 *       200:
	 *         description: Point of interest created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/PointsOfInterestResponseDto'
	 */
	public async create(
		options: APIHandlerOptions<{
			body: PointsOfInterestRequestDto;
		}>,
	): Promise<APIHandlerResponse<PointsOfInterestResponseDto>> {
		const { body } = options;
		const pointOfInterest = await this.pointsOfInterestService.create(body);

		return {
			payload: { data: pointOfInterest },
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /points-of-interest/{id}:
	 *   delete:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Points of Interest
	 *     summary: Delete a point of interest
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Point of interest deleted successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: boolean
	 */
	public async delete(
		options: APIHandlerOptions<{
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse<boolean>> {
		const id = Number(options.params.id);
		const isDeleted = await this.pointsOfInterestService.delete(id);

		return {
			payload: { data: isDeleted },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /points-of-interest:
	 *   get:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Points of Interest
	 *     summary: Retrieve points of interest with optional location-based filtering
	 *     parameters:
	 *       - in: query
	 *         name: latitude
	 *         schema:
	 *           type: string
	 *         description: User's latitude for location-based search
	 *       - in: query
	 *         name: longitude
	 *         schema:
	 *           type: string
	 *         description: User's longitude for location-based search
	 *       - in: query
	 *         name: radius
	 *         schema:
	 *           type: string
	 *         description: Search radius in kilometers
	 *     responses:
	 *       200:
	 *         description: A list of points of interest
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/PointsOfInterestResponseDto'
	 */
	public async findAll(
		options?: PointsOfInterestFindAllOptions,
	): Promise<APIHandlerResponse<PointsOfInterestResponseDto[]>> {
		const query = options && "query" in options ? options.query : {};
		const { items } = await this.pointsOfInterestService.findAll(query ?? {});

		return {
			payload: { data: items },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /points-of-interest/{id}:
	 *   get:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Points of Interest
	 *     summary: Get a point of interest by ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Point of interest found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/PointsOfInterestResponseDto'
	 */
	public async findById(
		options: APIHandlerOptions<{
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse<PointsOfInterestResponseDto>> {
		const id = Number(options.params.id);
		const pointOfInterest = await this.pointsOfInterestService.findById(id);

		return {
			payload: { data: pointOfInterest },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /points-of-interest/{id}:
	 *   patch:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Points of Interest
	 *     summary: Update a point of interest
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/PointsOfInterestRequestDto'
	 *     responses:
	 *       200:
	 *         description: Point of interest updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/PointsOfInterestResponseDto'
	 */
	public async patch(
		options: APIHandlerOptions<{
			body: PointsOfInterestRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse<PointsOfInterestResponseDto>> {
		const { body, params } = options;
		const id = Number(params.id);
		const pointOfInterest = await this.pointsOfInterestService.patch(id, body);

		return {
			payload: { data: pointOfInterest },
			status: HTTPCode.OK,
		};
	}
}

export { PointsOfInterestController };
