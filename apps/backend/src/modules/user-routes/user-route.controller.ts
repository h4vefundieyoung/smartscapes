import { APIPath } from "~/libs/enums/enums.js";
import { BaseController } from "~/libs/modules/controller/base-controller.module.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
} from "~/libs/modules/controller/libs/types/types.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/libs/types/logger.type.js";

import { UserRouteApiPath } from "./libs/enums/enum.js";
import {
	type UserRouteRequestDto,
	type UserRouteResponseDto,
} from "./libs/types/type.js";
import { type UserRouteService } from "./user-route.service.js";

class UserRouteController extends BaseController {
	private userRouteService: UserRouteService;

	public constructor(logger: Logger, userRouteService: UserRouteService) {
		super(logger, APIPath.USER_ROUTES);
		this.userRouteService = userRouteService;

		this.addRoute({
			handler: this.create.bind(this),
			method: "POST",
			path: UserRouteApiPath.ROOT,
		});
	}

	public async create(
		options: APIHandlerOptions<{ body: UserRouteRequestDto }>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { body } = options;

		const created = await this.userRouteService.create({
			...body,
		});

		return {
			payload: created,
			status: HTTPCode.CREATED,
		};
	}
}

export { UserRouteController };
