import { HTTPCode } from "~/libs/modules/http/http.js";
import { type RoutesResponseConstructDto } from "~/modules/routes/libs/types/types.js";

import { PlannedRoutesExceptionMessage } from "./libs/enums/enums.js";
import { PlannedRoutesError } from "./libs/exceptions/planned-routes-error.exception.js";
import { type PlannedRoutesResponseDto } from "./libs/types/types.js";
import { PlannedRoutesEntity } from "./planned-routes.entity.js";
import { type PlannedRoutesRepository } from "./planned-routes.repository.js";

class PlannedRoutesService {
	private plannedRoutesRepository: PlannedRoutesRepository;

	public constructor(plannedRoutesRepository: PlannedRoutesRepository) {
		this.plannedRoutesRepository = plannedRoutesRepository;
	}

	public async create(
		payload: RoutesResponseConstructDto,
		userId: number,
	): Promise<PlannedRoutesResponseDto> {
		const { distance, duration, geometry } = payload.route;

		const plannedRouteEntity = PlannedRoutesEntity.initializeNew({
			distance,
			duration,
			geometry,
			userId,
		});

		const plannedRoute =
			await this.plannedRoutesRepository.create(plannedRouteEntity);

		return plannedRoute.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.plannedRoutesRepository.delete(id);

		return isDeleted;
	}

	public async findById(id: number): Promise<PlannedRoutesResponseDto> {
		const plannedRoute = await this.plannedRoutesRepository.findById(id);

		if (!plannedRoute) {
			throw new PlannedRoutesError({
				message: PlannedRoutesExceptionMessage.PLANNED_ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return plannedRoute.toObject();
	}
}

export { PlannedRoutesService };
