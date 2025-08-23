import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationMeta } from "~/libs/types/types.js";
import { type PointsOfInterestService } from "~/modules/points-of-interest/points-of-interest.js";

import { PointsOfInterestApiPath } from "./libs/enums/enums.js";
import {
	type PointsOfInterestCreateRequestDto,
	type PointsOfInterestGetAllItemResponseDto,
	type PointsOfInterestGetAllQuery as PointsOfInterestGetAllQueryParameters,
	type PointsOfInterestGetByIdResponseDto,
} from "./libs/types/types.js";
import {
	pointOfInterestUpdateValidationSchema,
	pointsOfInterestCreateValidationSchema,
	pointsOfInterestQueryValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
 *     PointsOfInterestCreateRequestDto:
 *       type: object
 *       required:
 *         - location
 *         - name
 *         - description
 *       properties:
 *         location:
 *           $ref: '#/components/schemas/PointsOfInterestLocation'
 *         name:
 *           type: string
 *           example: "Central Park"
 *         description:
 *           type: string | null
 *           nullable: true
 *           example: "A large park in New York City"
 *
 *     PointsOfInterestGetByIdResponseDto:
 *       type: object
 *       required:
 *         - id
 *         - location
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         location:
 *           type: object
 *           required:
 *             - coordinates
 *             - type
 *           properties:
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               example: [30.5234, 50.4501]
 *             type:
 *               type: string
 *               enum: ["Point"]
 *               example: "Point"
 *         name:
 *           type: string
 *           example: "Central Park"
 *         description:
 *           type: string | null
 *           nullable: true
 *           example: "A large park in New York City"
 *
 *     PointsOfInterestGetAllItemResponseDto:
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
 *           type: object
 *           required:
 *             - coordinates
 *             - type
 *           properties:
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               example: [30.5234, 50.4501]
 *             type:
 *               type: string
 *               enum: ["Point"]
 *               example: "Point"
 *         name:
 *           type: string
 *           example: "Central Park"
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
			path: PointsOfInterestApiPath.ROOT,
			validation: {
				body: pointsOfInterestCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: this.delete.bind(this),
			method: "DELETE",
			path: PointsOfInterestApiPath.$ID,
		});

		this.addRoute({
			handler: this.findById.bind(this),
			method: "GET",
			path: PointsOfInterestApiPath.$ID,
		});

		this.addRoute({
			handler: this.findAll.bind(this),
			method: "GET",
			path: "/",
			validation: {
				query: pointsOfInterestQueryValidationSchema,
			},
		});

		this.addRoute({
			handler: this.patch.bind(this),
			method: "PATCH",
			path: PointsOfInterestApiPath.$ID,
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
	 *             $ref: '#/components/schemas/PointsOfInterestCreateRequestDto'
	 *     responses:
	 *       201:
	 *         description: Point of interest created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/PointsOfInterestGetByIdResponseDto'
	 */
	public async create(
		options: APIHandlerOptions<{
			body: PointsOfInterestCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse<PointsOfInterestGetByIdResponseDto>> {
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
	 *     summary: Retrieve points of interest with optional filtering and pagination
	 *     description: |
	 *       Get points of interest with various filtering and pagination options.
	 *
	 *       **Without query parameters**: Returns all points of interest
	 *
	 *       **With location parameters**: Returns points of interest within specified radius
	 *       from the given coordinates (latitude/longitude)
	 *
	 *       **With name parameter**: Returns all points of interest searched by name
	 *
	 *       **With pagination parameters (page & perPage)**: Returns paginated results with metadata
	 *     parameters:
	 *       - in: query
	 *         name: latitude
	 *         schema:
	 *           type: string
	 *           pattern: '^-?([1-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$'
	 *           example: "50.4501"
	 *         description: |
	 *           User's latitude for location-based search.
	 *           Must be between -90 and 90 degrees.
	 *           Required if longitude is provided.
	 *       - in: query
	 *         name: longitude
	 *         schema:
	 *           type: string
	 *           pattern: '^-?((1[0-7][0-9]|[1-9]?[0-9])(\.[0-9]+)?|180(\.0+)?)$'
	 *           example: "30.5234"
	 *         description: |
	 *           User's longitude for location-based search.
	 *           Must be between -180 and 180 degrees.
	 *           Required if latitude is provided.
	 *       - in: query
	 *         name: radius
	 *         schema:
	 *           type: string
	 *           pattern: '^[0-9]+(\.[0-9]+)?$'
	 *           example: "5"
	 *         description: |
	 *           Search radius in kilometers.
	 *           Default value is 5 km if not specified.
	 *           Must be between 0.1 and 50 km.
	 *       - in: query
	 *         name: name
	 *         schema:
	 *           type: string
	 *           example: "Park"
	 *         description: |
	 *           Full or partial name to search for.
	 *           Must be between 3 and 255 characters.
	 *           Case-insensitive search is supported.
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *           pattern: '^[1-9][0-9]*$'
	 *           example: "1"
	 *         description: Page number (starts from 1). When provided with perPage, returns paginated response.
	 *       - in: query
	 *         name: perPage
	 *         schema:
	 *           type: string
	 *           pattern: '^[1-9][0-9]*$'
	 *           example: "10"
	 *         description: Number of items per page. When provided with page, returns paginated response.
	 *       - in: query
	 *         name: search
	 *         schema:
	 *           type: string
	 *           minLength: 1
	 *           maxLength: 255
	 *           example: "Central Park"
	 *         description: Optional search term to filter points of interest by name (used with pagination).
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved points of interest
	 *         content:
	 *           application/json:
	 *             schema:
	 *              type: object
	 *              properties:
	 *                data:
	 *                  type: array
	 *                  items:
	 *                    $ref: '#/components/schemas/PointsOfInterestGetAllItemResponseDto'
	 *                meta:
	 *                  type: object
	 *                  properties:
	 *                    currentPage:
	 *                      type: number
	 *                      example: 1
	 *                    itemsPerPage:
	 *                      type: number
	 *                      example: 10
	 *                    total:
	 *                      type: number
	 *                      example: 25
	 *                    totalPages:
	 *                      type: number
	 *                      example: 3
	 *              description: Paginated response (when page & perPage provided)
	 */
	public async findAll(
		options: APIHandlerOptions<{
			query?: PointsOfInterestGetAllQueryParameters;
		}>,
	): Promise<
		APIHandlerResponse<PointsOfInterestGetAllItemResponseDto[], PaginationMeta>
	> {
		const { query = null } = options;

		const { items, meta } = await this.pointsOfInterestService.findAll(query);

		return {
			payload: { data: items, meta },
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
	 *                   $ref: '#/components/schemas/PointsOfInterestGetByIdResponseDto'
	 */
	public async findById(
		options: APIHandlerOptions<{
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse<PointsOfInterestGetByIdResponseDto>> {
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
	 *             $ref: '#/components/schemas/PointsOfInterestCreateRequestDto'
	 *     responses:
	 *       200:
	 *         description: Point of interest updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/PointsOfInterestGetByIdResponseDto'
	 */
	public async patch(
		options: APIHandlerOptions<{
			body: PointsOfInterestCreateRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse<PointsOfInterestGetByIdResponseDto>> {
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
