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

		const createdRoute = UserRouteEntity.initializeNew({
			actualGeometry: geometry,
			plannedGeometry: geometry,
			routeId,
			status: UserRouteStatus.NOT_STARTED,
			userId,
		});

		const created = await this.userRouteRepository.create(createdRoute);

		return created.toObject();
	}

	public async finish(payload: {
		actualGeometry: LineStringGeometry;
		routeId: number;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { actualGeometry, routeId, userId } = payload;

		const userRoute = await this.getByRouteId(routeId);

		this.ensureUserIsOwner(userRoute, userId);

		await this.ensureUserIsNotOnActiveRoute(userId);

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

	public async getAllByUserId(userId: number): Promise<UserRouteResponseDto[]> {
		const userRoutes = await this.userRouteRepository.findAllByUserId(userId);

		return userRoutes.map((item) => item.toObject());
	}

	public async start(payload: {
		routeId: number;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { routeId, userId } = payload;

		const userRoute = await this.getByRouteId(routeId);

		this.ensureUserIsOwner(userRoute, userId);

		await this.ensureUserIsNotOnActiveRoute(userId);

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

	private async ensureUserIsNotOnActiveRoute(userId: number): Promise<void> {
		const isOnActiveRoute =
			await this.userRouteRepository.hasActiveRoute(userId);

		if (isOnActiveRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ALREADY_ON_ACTIVE_STATUS,
				status: HTTPCode.CONFLICT,
			});
		}
	}

	private ensureUserIsOwner(
		userRoute: UserRouteResponseDto,
		userId: number,
	): void {
		if (userRoute.userId !== userId) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_OWNED,
				status: HTTPCode.FORBIDDEN,
			});
		}
	}

	private async getByRouteId(routeId: number): Promise<UserRouteResponseDto> {
		const userRoute = await this.userRouteRepository.findByRouteId(routeId);

		if (!userRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return userRoute.toObject();
	}
}

export { UserRouteService };
