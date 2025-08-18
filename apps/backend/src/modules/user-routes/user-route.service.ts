import { type Service } from "~/libs/types/types.js";

import { type RouteService } from "../routes/route.service.js";
import {
	type UserRouteRequestDto,
	type UserRouteResponseDto,
} from "./libs/types/type.js";
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

	public async create(
		payload: UserRouteRequestDto,
	): Promise<UserRouteResponseDto> {
		const { routeId, userId } = payload;

		const { geometry } = await this.routeService.findById(routeId);

		const created = UserRouteEntity.initializeNew({
			actualGeometry: geometry,
			plannedGeometry: geometry,
			routeId,
			userId,
		});

		const createdUserRoute = await this.userRouteRepository.create(created);

		return createdUserRoute.toObject();
	}
}

export { UserRouteService };
