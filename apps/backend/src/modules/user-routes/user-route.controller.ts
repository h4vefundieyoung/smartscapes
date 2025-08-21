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
	type userRoutePatchRequestDto,
	type UserRouteResponseDto,
} from "./libs/types/type.js";
import {
	userRouteCreateValidationSchema,
	userRouteParametersValidationSchema,
	userRoutePatchValidationSchema,
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
			method: "PATCH",
			path: UserRouteApiPath.FINISH,
			validation: {
				body: userRoutePatchValidationSchema,
				params: userRouteParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: this.start.bind(this),
			method: "PATCH",
			path: UserRouteApiPath.START,
			validation: {
				params: userRouteParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: this.getAllByUserId.bind(this),
			method: "GET",
			path: UserRouteApiPath.$ID,
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

		const createdRoute = await this.userRouteService.create({
			routeId,
			userId,
		});

		return {
			payload: { data: createdRoute },
			status: HTTPCode.CREATED,
		};
	}

	public async finish(
		options: APIHandlerOptions<{
			body: userRoutePatchRequestDto;
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { body, params } = options;
		const { actualGeometry, routeId } = body;
		const { userId } = params;

		const updatedRoute = await this.userRouteService.finish({
			actualGeometry,
			routeId,
			userId,
		});

		return {
			payload: { data: updatedRoute },
			status: HTTPCode.OK,
		};
	}

	public async getAllByUserId(
		options: APIHandlerOptions<{
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto[]>> {
		const { userId } = options.params;

		const userRoutes = await this.userRouteService.getAllByUserId(userId);

		return {
			payload: { data: userRoutes },
			status: HTTPCode.OK,
		};
	}

	public async start(
		options: APIHandlerOptions<{
			body: userRoutePatchRequestDto;
			params: UserRouteParameters;
		}>,
	): Promise<APIHandlerResponse<UserRouteResponseDto>> {
		const { routeId } = options.body;
		const { userId } = options.params;

		const updatedRoute = await this.userRouteService.start({
			routeId,
			userId,
		});

		return {
			payload: { data: updatedRoute },
			status: HTTPCode.OK,
		};
	}
}

export { UserRouteController };
