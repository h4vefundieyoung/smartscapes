import { HTTPCode } from "~/libs/enums/enums.js";
import {
	MapboxAPIGeometric,
	MapboxAPIProfile,
	type MapboxDirectionsApi,
} from "~/libs/modules/mapbox/mapbox.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";

import { type PlannedRoutesResponseDto } from "../planned-routes/libs/types/planned-routes-response-dto.type.js";
import { type PlannedRoutesService } from "../planned-routes/planned-routes.service.js";
import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesExceptionMessage } from "./libs/enums/enums.js";
import { RoutesError } from "./libs/exceptions/exceptions.js";
import {
	type RoutesFindAllOptions,
	type RoutesRequestCreateDto,
	type RoutesRequestPatchDto,
	type RoutesResponseDto,
} from "./libs/types/types.js";
import { RoutesEntity } from "./routes.entity.js";
import { type RoutesRepository } from "./routes.repository.js";

type ConstructorParameters = {
	mapboxDirectionsApi: MapboxDirectionsApi;
	plannedRoutesService: PlannedRoutesService;
	pointsOfInterestService: PointsOfInterestService;
	routesRepository: RoutesRepository;
};

class RoutesService implements Service {
	private mapboxDirectionApi: MapboxDirectionsApi;
	private plannedRoutesService: PlannedRoutesService;
	private pointsOfInterestService: PointsOfInterestService;
	private routesRepository: RoutesRepository;

	public constructor({
		mapboxDirectionsApi,
		plannedRoutesService,
		pointsOfInterestService,
		routesRepository,
	}: ConstructorParameters) {
		this.routesRepository = routesRepository;
		this.pointsOfInterestService = pointsOfInterestService;
		this.mapboxDirectionApi = mapboxDirectionsApi;
		this.plannedRoutesService = plannedRoutesService;
	}

	public async construct(
		pointsOfInterest: number[],
		userId: string,
	): Promise<PlannedRoutesResponseDto> {
		const { items } = await this.pointsOfInterestService.findAll({
			ids: pointsOfInterest,
		});

		if (items.length !== pointsOfInterest.length) {
			throw new RoutesError({
				message: RoutesExceptionMessage.POI_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const coordinates = items.map(({ location }) => location.coordinates);

		const route = await this.mapboxDirectionApi.getRoute(
			MapboxAPIProfile.WALKING,
			coordinates,
			MapboxAPIGeometric.GEOJSON,
		);

		const plannedRoute = await this.plannedRoutesService.create(
			route,
			Number(userId),
		);

		return plannedRoute;
	}

	public async create(
		payload: RoutesRequestCreateDto,
	): Promise<RoutesResponseDto> {
		await this.ensurePoisExist(payload.pois);

		const formattedPayload = {
			...payload,
			pois: payload.pois.map((id, index) => ({
				id,
				visitOrder: index,
			})),
		};

		const routeEntity = RoutesEntity.initializeNew(formattedPayload);

		const route = await this.routesRepository.create(routeEntity);

		return route.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.routesRepository.delete(id);

		if (!isDeleted) {
			throw new RoutesError({
				message: RoutesExceptionMessage.ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return isDeleted;
	}

	public async findAll(
		options: null | RoutesFindAllOptions,
	): Promise<CollectionResult<RoutesResponseDto>> {
		const items = await this.routesRepository.findAll(options);

		return {
			items: items.map((item) => {
				return item.toObject();
			}),
		};
	}

	public async findById(id: number): Promise<RoutesResponseDto> {
		const item = await this.routesRepository.findById(id);

		if (!item) {
			throw new RoutesError({
				message: RoutesExceptionMessage.ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}

	public async patch(
		id: number,
		payload: RoutesRequestPatchDto,
	): Promise<RoutesResponseDto> {
		const item = await this.routesRepository.patch(id, payload);

		if (!item) {
			throw new RoutesError({
				message: RoutesExceptionMessage.ROUTE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}

	private async ensurePoisExist(pois: number[]): Promise<void> {
		const filteredPois = await this.pointsOfInterestService.findAll({
			ids: pois,
		});

		if (pois.length !== filteredPois.items.length) {
			throw new RoutesError({
				message: RoutesExceptionMessage.POI_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}
	}
}

export { RoutesService };
