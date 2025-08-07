import { HTTPCode } from "~/libs/enums/enums.js";
import {
	type GetMapboxRouteResponseDto,
	MapboxAPIGeometricsType,
	MapboxAPIProfile,
	type MapboxDirectionsApi,
} from "~/libs/modules/mapbox/mapbox.js";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesExceptionMessage } from "./libs/enums/enums.js";
import { RoutesError } from "./libs/exceptions/exceptions.js";

class RoutesService {
	private mapboxDirectionApi: MapboxDirectionsApi;
	private pointsOfInterestService: PointsOfInterestService;

	public constructor(
		mapboxDirectionsApi: MapboxDirectionsApi,
		pointOfInterestService: PointsOfInterestService,
	) {
		this.pointsOfInterestService = pointOfInterestService;
		this.mapboxDirectionApi = mapboxDirectionsApi;
	}

	public async construct(
		pointsOfInterest: number[],
	): Promise<GetMapboxRouteResponseDto> {
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

		const responseData = await this.mapboxDirectionApi.getRoute(
			MapboxAPIProfile.WALKING,
			coordinates,
			MapboxAPIGeometricsType.GEOJSON,
		);

		return responseData;
	}
}

export { RoutesService };
