import { type Service } from "~/libs/types/types.js";

import {
	type UserRouteRequestDto,
	type UserRouteResponseDto,
} from "./libs/types/type.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteRepository } from "./user-route.repository.js";

class UserRouteService implements Service {
	private userRouteRepository: UserRouteRepository;

	public constructor(userRouteRepository: UserRouteRepository) {
		this.userRouteRepository = userRouteRepository;
	}

	public async create(
		payload: UserRouteRequestDto & { userId: number },
	): Promise<UserRouteResponseDto> {
		const entity = UserRouteEntity.initializeNew({
			actualGeometry: { coordinates: [], type: "LineString" },
			actualPath: "",
			completedAt: new Date().toISOString(),
			plannedGeometry: { coordinates: [], type: "LineString" },
			routeId: payload.routeId,
			startedAt: new Date().toISOString(),
			status: "active" as never,
			userId: payload.userId,
		});

		const created = await this.userRouteRepository.create(entity);

		return created.toObject();
	}
}

export { UserRouteService };

