import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { RouteApiPath, RoutesExceptionMessage } from "./libs/enums/enums.js";
import { RoutesError } from "./libs/exceptions/exceptions.js";
import {
	type ConstructRouteRequestDto,
	type GetMapBoxRouteResponseDto,
} from "./libs/types/types.js";
import { constructRouteValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type RoutesService } from "./routes.service.js";

const MAX_REQUESTS_PER_MINUTE = 5;
const SECONDS = 60;
const SECOND_MS = 1000;
const MINUTE_MS = SECONDS * SECOND_MS;

/**
 * @swagger
 * components:
 *   schemas:
 *     Coordinate:
 *       type: array
 *       items:
 *         type: number
 *       minItems: 2
 *       maxItems: 2
 *       example: [30.5, 50.4]
 *
 *     GetMapBoxRouteResponseDto:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         routes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MapBoxRoute'
 *         uuid:
 *           type: string
 *         waypoints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MapBoxWaypoint'
 *
 *     MapBoxRoute:
 *       type: object
 *       properties:
 *         distance:
 *           type: number
 *         duration:
 *           type: number
 *         geometry:
 *           type: object
 *           properties:
 *             coordinates:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coordinate'
 *             type:
 *               type: string
 *         legs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MapBoxLegs'
 *         weight:
 *           type: number
 *         weight_name:
 *           type: string
 *
 *     MapBoxLegs:
 *       type: object
 *       properties:
 *         admins:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               iso_3166_1:
 *                 type: string
 *               iso_3166_1_alpha3:
 *                 type: string
 *         distance:
 *           type: number
 *         duration:
 *           type: number
 *         summary:
 *           type: string
 *         weight:
 *           type: number
 *
 *     MapBoxWaypoint:
 *       type: object
 *       properties:
 *         distance:
 *           type: number
 *         location:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Coordinate'
 *         name:
 *           type: string
 */
class RoutesController extends BaseController {
	private debounceMap: Record<number, number>;
	private routesService: RoutesService;

	public constructor(logger: Logger, routesService: RoutesService) {
		super(logger, APIPath.ROUTES);

		this.routesService = routesService;
		this.debounceMap = {};

		this.addRoute({
			handler: this.constructRoute.bind(this),
			method: "POST",
			path: RouteApiPath.CONSTRUCT,
			validation: {
				body: constructRouteValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /routes/construct:
	 *   post:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Routes
	 *     summary: Construct Mapbox route
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - pointsOfInterest
	 *             properties:
	 *               pointsOfInterest:
	 *                 type: array
	 *                 items:
	 *                   type: integer
	 *                 example: [1,2]
	 *     responses:
	 *       200:
	 *         description: Mapbox service response
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/GetMapBoxRouteResponseDto'
	 */
	private async constructRoute({
		body: { pointsOfInterest },
		user,
	}: APIHandlerOptions<{ body: ConstructRouteRequestDto }>): Promise<
		APIHandlerResponse<GetMapBoxRouteResponseDto>
	> {
		if (user) {
			this.debounce(user.id);
		}

		const data = await this.routesService.buildRoute(pointsOfInterest);

		return {
			payload: { data },
			status: HTTPCode.OK,
		};
	}

	private debounce(id: number): void {
		if (!this.debounceMap[id]) {
			this.debounceMap[id] = 1;

			setTimeout(() => {
				this.debounceMap[id] = 0;
			}, MINUTE_MS);

			return;
		}

		const requestsAmount = this.debounceMap[id];

		if (requestsAmount === MAX_REQUESTS_PER_MINUTE) {
			throw new RoutesError({
				message: RoutesExceptionMessage.LIMIT_REACHED,
				status: HTTPCode.REQUEST_LIMIT,
			});
		}

		this.debounceMap[id]++;
	}
}

export { RoutesController };
