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

		await this.ensureIsNotDublicateRoute(userId, geometry);

		const createdRoute = await this.userRouteRepository.create(createdData);

		return createdRoute.toObject();
	}

	public async finish(payload: {
		actualGeometry: LineStringGeometry;
		routeId: number;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { actualGeometry, routeId, userId } = payload;

		const userRoute = await this.getByRouteId(routeId);

		this.ensureUserIsOwner(userRoute, userId);

		this.ensureReadyToFinish(userRoute);

		const updatedData = UserRouteEntity.initialize({
			...userRoute,
			actualGeometry,
			status: UserRouteStatus.COMPLETED,
		});

		const updated = (await this.userRouteRepository.patch(
			userRoute.id,
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

		const updatedData = UserRouteEntity.initialize({
			...userRoute,
			actualGeometry: userRoute.plannedGeometry,
			status: UserRouteStatus.ACTIVE,
		});

		const updatedRoute = (await this.userRouteRepository.patch(
			userRoute.id,
			userId,
			updatedData,
		)) as UserRouteEntity;

		return updatedRoute.toObject();
	}

	private async ensureIsNotDublicateRoute(
		userId: number,
		geometry: LineStringGeometry,
	): Promise<void> {
		const isDublicateRoute = await this.userRouteRepository.hasDublicateRoute(
			userId,
			geometry,
		);

		if (isDublicateRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_ALREADY_EXISTS,
				status: HTTPCode.FORBIDDEN,
			});
		}
	}

	private ensureReadyToFinish(userRoute: UserRouteResponseDto): void {
		if (userRoute.status !== UserRouteStatus.ACTIVE) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.ROUTE_CANNOT_BE_FINISHED,
				status: HTTPCode.FORBIDDEN,
			});
		}
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
