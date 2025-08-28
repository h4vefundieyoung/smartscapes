import { HTTPCode } from "~/libs/enums/enums.js";
import { getCurrentIsoDate } from "~/libs/helpers/helpers.js";
import { type LineStringGeometry, type Service } from "~/libs/types/types.js";

import { type RouteService } from "../routes/route.service.js";
import {
	UserRouteExeptionMessage,
	UserRouteStatus,
} from "./libs/enums/enum.js";
import { UserRouteError } from "./libs/exceptions/exceptions.js";
import {
	type UserRouteGetAllFilters,
	type UserRouteResponseDto,
	type UserRouteStatusType,
} from "./libs/types/types.js";
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

		await this.ensureUserIsNotOnActiveRoute(userId);

		await this.ensureIsNotDuplicateRoute(routeId, userId);

		const { distance, geometry } = await this.routeService.findById(routeId);

		const createdData = UserRouteEntity.initializeNew({
			actualGeometry: geometry,
			distance,
			plannedGeometry: geometry,
			routeId,
			status: UserRouteStatus.NOT_STARTED,
			userId,
		});
		const createdRoute = await this.userRouteRepository.create(createdData);

		return createdRoute.toObject();
	}

	public async deleteSavedRoute(
		routeId: number,
		userId: number,
	): Promise<boolean> {
		const isDeleted = await this.userRouteRepository.deleteSavedRoute(
			routeId,
			userId,
		);

		if (!isDeleted) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return isDeleted;
	}

	public async finish(payload: {
		actualGeometry: LineStringGeometry;
		routeId: number;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { actualGeometry, routeId, userId } = payload;

		const userRoute = await this.getOne({
			routeId,
			userId,
		});

		this.ensureUserIsOwner(userRoute.userId, userId);

		this.ensureReadyToFinish(userRoute.status);

		const updatedData = UserRouteEntity.initialize({
			...userRoute,
			actualGeometry,
			completedAt: getCurrentIsoDate(),
			status: UserRouteStatus.COMPLETED,
		});

		const updatedRoute = await this.userRouteRepository.patch(
			userRoute.id,
			userId,
			updatedData,
		);

		if (!updatedRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return updatedRoute.toObject();
	}

	public async getAll(
		filters: UserRouteGetAllFilters,
	): Promise<UserRouteResponseDto[]> {
		const userRoutes = await this.userRouteRepository.findAll(filters);

		return userRoutes.map((item) => item.toObject());
	}

	public async getOne(
		filters: UserRouteGetAllFilters,
	): Promise<UserRouteResponseDto> {
		const userRoute = await this.userRouteRepository.findOne(filters);

		if (!userRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return userRoute.toObject();
	}

	public async getPopularRoutes(): Promise<UserRouteResponseDto[]> {
		const routes = await this.userRouteRepository.findPopular();

		return routes.map((item) => item.toObject());
	}

	public async start(payload: {
		routeId: number;
		userId: number;
	}): Promise<UserRouteResponseDto> {
		const { routeId, userId } = payload;

		const userRoute = await this.getOne({ routeId, userId });

		this.ensureUserIsOwner(userRoute.userId, userId);

		await this.ensureUserIsNotOnActiveRoute(userId);

		const updatedData = UserRouteEntity.initialize({
			...userRoute,
			actualGeometry: userRoute.plannedGeometry,
			completedAt: null,
			startedAt: getCurrentIsoDate(),
			status: UserRouteStatus.ACTIVE,
		});

		const updatedRoute = await this.userRouteRepository.patch(
			userRoute.id,
			userId,
			updatedData,
		);

		if (!updatedRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return updatedRoute.toObject();
	}

	private async ensureIsNotDuplicateRoute(
		routeId: number,
		userId: number,
	): Promise<void> {
		const userRoute = await this.userRouteRepository.findOne({
			routeId,
			status: UserRouteStatus.NOT_STARTED,
			userId,
		});

		if (userRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_ALREADY_EXISTS,
				status: HTTPCode.FORBIDDEN,
			});
		}
	}

	private ensureReadyToFinish(status: UserRouteStatusType): void {
		if (status !== UserRouteStatus.ACTIVE) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.ROUTE_CANNOT_BE_FINISHED,
				status: HTTPCode.FORBIDDEN,
			});
		}
	}

	private async ensureUserIsNotOnActiveRoute(userId: number): Promise<void> {
		const hasActiveRoute =
			await this.userRouteRepository.checkHasActiveRoute(userId);

		if (hasActiveRoute) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ALREADY_ON_ACTIVE_STATUS,
				status: HTTPCode.CONFLICT,
			});
		}
	}

	private ensureUserIsOwner(userRouteUserId: number, userId: number): void {
		if (userRouteUserId !== userId) {
			throw new UserRouteError({
				message: UserRouteExeptionMessage.USER_ROUTE_NOT_OWNED,
				status: HTTPCode.FORBIDDEN,
			});
		}
	}
}

export { UserRouteService };
