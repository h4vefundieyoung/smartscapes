import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import { BaseController } from "~/libs/modules/controller/base-controller.module.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type GetMapBoxRouteResponseDto } from "~/libs/modules/map-box/map-box.js";

import { RouteApiPath, RoutesExceptionMessage } from "./libs/enums/enums.js";
import { RoutesError } from "./libs/exceptions/routes.exception.js";
import { type ConstructRouteRequestDto } from "./libs/types/types.js";
import { type RoutesService } from "./routes.service.js";

const MAX_REQUESTS_PER_MINUTE = 5;
const SECONDS = 60;
const SECOND_MS = 1000;
const MINUTE_MS = SECONDS * SECOND_MS;

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
		});
	}

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
