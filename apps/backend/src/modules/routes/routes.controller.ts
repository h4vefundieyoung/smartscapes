import { HTTPCode } from "~/libs/enums/enums.js";
import { BaseController } from "~/libs/modules/controller/base-controller.module.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type MapBoxDirectionsApi } from "~/libs/modules/map-box/map-box.js";

class RoutesController extends BaseController {
	private mapBoxDirectionApi: MapBoxDirectionsApi;

	public constructor(logger: Logger, mapBoxDirectionsApi: MapBoxDirectionsApi) {
		super(logger, "");
		this.mapBoxDirectionApi = mapBoxDirectionsApi;

		this.addRoute({
			handler: this.constructRoute.bind(this),
			method: "POST",
			path: "/",
		});
	}

	private async constructRoute({
		body = null,
	}: APIHandlerOptions<{ body: null }>): Promise<APIHandlerResponse> {
		return await Promise.resolve({
			payload: body,
			status: HTTPCode.OK,
		});
	}
}

export { RoutesController };
