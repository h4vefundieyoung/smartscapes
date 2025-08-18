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
	type UserRouteCreateRequestDto,
	type UserRouteFinishRequestDto,
	type UserRouteParameters,
	type UserRouteResponseDto,
} from "./libs/types/type.js";
import {
	userRouteCreateValidationSchema,
	userRouteFinishValidationSchema,
	userRouteParametersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type UserRouteService } from "./user-route.service.js";

class UserRouteController extends BaseController {
	private userRouteService: UserRouteService;

	public constructor(logger: Logger, userRouteService: UserRouteService) {
		super(logger, APIPath.USER_ROUTES);
		this.userRouteService = userRouteService;

		this.addRoute({
			handler: this.create.bind(this),
			method: "POST",
			path: UserRouteApiPath.$ID,
			validation: {
				body: userRouteCreateValidationSchema,
				params: userRouteParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: this.finish.bind(this),
			method: "POST",
			path: UserRouteApiPath.FINISH,
			validation: {
				body: userRouteFinishValidationSchema,
				params: userRouteParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: this.start.bind(this),
			method: "POST",
			path: UserRouteApiPath.START,
			validation: {
				params: userRouteParametersValidationSchema,
			},
		});
	}

	public async create(
		options: APIHandlerOptions<{
			body: UserRouteCreateRequestDto;
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { body, params } = options;
		const { routeId } = body;
		const { userId } = params;

		const created = await this.userRouteService.create({ routeId, userId });

		return {
			payload: { data: created },
			status: HTTPCode.CREATED,
		};
	}

	public async finish(
		options: APIHandlerOptions<{
			body: UserRouteFinishRequestDto;
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { body, params } = options;
		const { actualGeometry } = body;
		const { userId } = params;

		const updated = await this.userRouteService.finish({
			actualGeometry,
			userId,
		});

		return {
			payload: { data: updated },
			status: HTTPCode.OK,
		};
	}

	public async start(
		options: APIHandlerOptions<{
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { userId } = options.params;

		const updated = await this.userRouteService.start({ userId });

		return {
			payload: { data: updated },
			status: HTTPCode.OK,
		};
	}
}

export { UserRouteController };
