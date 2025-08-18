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
	type UserRouteParameters,
	type UserRouteResponseDto,
	type UserRouteUpdateRequestDto,
} from "./libs/types/type.js";
import {
	userRouteCreateValidationSchema,
	userRouteParametersValidationSchema,
	userRouteUpdateValidationSchema,
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
				body: userRouteUpdateValidationSchema,
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
			body: UserRouteUpdateRequestDto;
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { body, params } = options;
		const { actualGeometry, routeId } = body;
		const { userId } = params;

		const updated = await this.userRouteService.finish({
			actualGeometry,
			routeId,
			userId,
		});

		return {
			payload: { data: updated },
			status: HTTPCode.OK,
		};
	}

	public async start(
		options: APIHandlerOptions<{
			body: UserRouteUpdateRequestDto;
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { routeId } = options.body;
		const { userId } = options.params;

		const updated = await this.userRouteService.start({
			routeId,
			userId,
		});

		return {
			payload: { data: updated },
			status: HTTPCode.OK,
		};
	}
}

export { UserRouteController };
