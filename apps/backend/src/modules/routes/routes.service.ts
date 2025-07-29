import { HTTPCode } from "~/libs/modules/http/http.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesExceptionMessage } from "./libs/enums/enums.js";
import { RoutesError } from "./libs/exceptions/exceptions.js";
import { RouteEntity } from "./routes.entity.js";
import { type RoutesRepository } from "./routes.repository.js";

class RoutesService implements Service {
	private pointsOfInterestService: PointsOfInterestService;
	private routesRepository: RoutesRepository;

	public constructor(
		routesRepository: RoutesRepository,
		pointsOfInterestService: PointsOfInterestService,
	) {
		this.routesRepository = routesRepository;
		this.pointsOfInterestService = pointsOfInterestService;
	}

	public async create(payload: {
		description: string;
		name: string;
		pois: number[];
	}): Promise<{
		description: string;
		id: number;
		name: string;
		pois: { id: number; visitOrder: number }[];
	}> {
		await this.ensurePoisExist(payload);

		const formattedPayload = {
			...payload,
			pois: payload.pois.map((id, index) => ({
				id,
				visitOrder: index,
			})),
		};

		const routeEntity = RouteEntity.initializeNew(formattedPayload);

		const route = await this.routesRepository.create(routeEntity);

		return route.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.routesRepository.delete(id);
	}

	public async find(id: number): Promise<null | {
		description: string;
		id: number;
		name: string;
		pois: { id: number; visitOrder: number }[];
	}> {
		const route = await this.routesRepository.find(id);

		return route ? route.toObject() : null;
	}

	public async findAll(): Promise<
		CollectionResult<{
			description: string;
			id: number;
			name: string;
			pois: { id: number; visitOrder: number }[];
		}>
	> {
		const items = await this.routesRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async update(
		id: number,
		payload: { description: string; name: string; pois: number[] },
	): Promise<null | {
		description: string;
		id: number;
		name: string;
		pois: { id: number; visitOrder: number }[];
	}> {
		await this.ensurePoisExist(payload);

		const formattedPayload = {
			...payload,
			pois: payload.pois.map((id, index) => ({
				id,
				visitOrder: index,
			})),
		};

		const routeEntity = RouteEntity.initializeNew(formattedPayload);

		const updatedRoute = await this.routesRepository.update(id, routeEntity);

		return updatedRoute ? updatedRoute.toObject() : null;
	}

	private async ensurePoisExist(payload: {
		description: string;
		name: string;
		pois: number[];
	}): Promise<void> {
		for (const poiId of payload.pois) {
			try {
				await this.pointsOfInterestService.findById(poiId);
			} catch {
				throw new RoutesError({
					message: RoutesExceptionMessage.POI_NOT_FOUND,
					status: HTTPCode.CONFLICT,
				});
			}
		}
	}
}

export { RoutesService };
