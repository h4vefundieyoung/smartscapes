import { HTTPCode } from "~/libs/enums/enums.js";
import { type LineStringGeometry, type Service } from "~/libs/types/types.js";

import { type RouteService } from "../routes/route.service.js";
import {
	UserRouteExeptionMessage,
	UserRouteStatus,
} from "./libs/enums/enum.js";
import { UserRouteError } from "./libs/exeptions/exeptions.js";
import { type UserRouteResponseDto } from "./libs/types/type.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteRepository } from "./user-route.repository.js";

class UserRouteService implements Service {
	private routeService: RouteService;

	private userRouteRepository: UserRouteRepository;

	public constructor(
		userRouteRepository: UserRouteRepository,
		routeService: RouteService,
	) {
		this.userRouteRepository = userRouteRepository;
		this.routeService = routeService;
	}

	public async create(payload: {
		routeId: number;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { routeId, userId } = payload;

		const { geometry } = await this.routeService.findById(routeId);

		const createdData = UserRouteEntity.initializeNew({
			actualGeometry: geometry,
			plannedGeometry: geometry,
			routeId,
			status: UserRouteStatus.NOT_STARTED,
			userId,
		});

		const created = await this.userRouteRepository.create(createdData);

		return created.toObject();
	}

	public async finish(payload: {
		actualGeometry: LineStringGeometry;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { actualGeometry, userId } = payload;

		const userRoute = await this.getUserRoute(userId);

		const updatedData = UserRouteEntity.initializeNew({
			...userRoute,
			actualGeometry,
			status: UserRouteStatus.COMPLETED,
		});

		const updated = (await this.userRouteRepository.patch(
			userId,
			updatedData,
		)) as UserRouteEntity;

		return updated.toObject();
	}

	public async start(payload: {
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { userId } = payload;

		const userRoute = await this.getUserRoute(userId);

		if (userRoute.status === UserRouteStatus.ACTIVE) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ALREADY_ON_ACTIVE_STATUS,
				status: HTTPCode.CONFLICT,
			});
		}

		const updatedData = UserRouteEntity.initializeNew({
			...userRoute,
			status: UserRouteStatus.ACTIVE,
		});

		const updatedRoute = (await this.userRouteRepository.patch(
			userId,
			updatedData,
		)) as UserRouteEntity;

		return updatedRoute.toObject();
	}

	private async getUserRoute(userId: number): Promise<UserRouteResponseDto> {
		const result = await this.userRouteRepository.findById(userId);

		if (!result) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return result.toObject();
	}
}

export { UserRouteService };
