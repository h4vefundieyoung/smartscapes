import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import { getRequestDebouncer } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { RouteApiPath } from "./libs/enums/enums.js";
import {
	type ConstructRouteRequestDto,
	type GetMapboxRouteResponseDto,
} from "./libs/types/types.js";
import { constructRouteValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type RoutesService } from "./routes.service.js";

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
 *     GetMapboxRouteResponseDto:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         routes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MapboxRoute'
 *         uuid:
 *           type: string
 *         waypoints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MapboxWaypoint'
 *
 *     MapboxRoute:
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
 *             $ref: '#/components/schemas/MapboxLegs'
 *         weight:
 *           type: number
 *         weight_name:
 *           type: string
 *
 *     MapboxLegs:
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
 *     MapboxWaypoint:
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
	private routesService: RoutesService;

	public constructor(logger: Logger, routesService: RoutesService) {
		super(logger, APIPath.ROUTES);

		this.routesService = routesService;

		const constructRequestsPerMinute = 5;
		this.addRoute({
			handler: this.constructRoute.bind(this),
			method: "POST",
			path: RouteApiPath.CONSTRUCT,
			preHandlers: [getRequestDebouncer(constructRequestsPerMinute)],
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
	 *                   $ref: '#/components/schemas/GetMapboxRouteResponseDto'
	 */
	public async constructRoute({
		body: { pointsOfInterest },
	}: APIHandlerOptions<{ body: ConstructRouteRequestDto }>): Promise<
		APIHandlerResponse<GetMapboxRouteResponseDto>
	> {
		const data = await this.routesService.construct(pointsOfInterest);

		return {
			payload: { data },
			status: HTTPCode.OK,
		};
	}
}

export { RoutesController };
