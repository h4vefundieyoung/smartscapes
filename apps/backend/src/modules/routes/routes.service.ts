import { HTTPCode } from "~/libs/enums/enums.js";
import {
	type GetMapBoxRouteResponseDto,
	MapBoxAPIGeometricsType,
	MapBoxAPIProfiles,
	type MapBoxDirectionsApi,
} from "~/libs/modules/map-box/map-box.js";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesExceptionMessage } from "./libs/enums/routes-exception-message.enum.js";
import { RoutesError } from "./libs/exceptions/exceptions.js";

class RoutesService {
	private mapBoxDirectionApi: MapBoxDirectionsApi;
	private pointsOfInterestService: PointsOfInterestService;

	public constructor(
		mapBoxDirectionsApi: MapBoxDirectionsApi,
		pointOfInterestService: PointsOfInterestService,
	) {
		this.pointsOfInterestService = pointOfInterestService;
		this.mapBoxDirectionApi = mapBoxDirectionsApi;
	}

	public async buildRoute(
		pointsOfInterest: number[],
	): Promise<GetMapBoxRouteResponseDto> {
		const { items } =
			await this.pointsOfInterestService.findAllById(pointsOfInterest);

		if (items.length !== pointsOfInterest.length) {
			throw new RoutesError({
				message: RoutesExceptionMessage.POI_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const coordinates = items.map(({ location }) => location.coordinates);

		const responseData = await this.mapBoxDirectionApi.getRoute(
			MapBoxAPIProfiles.WALKING,
			coordinates,
			MapBoxAPIGeometricsType.GEOJSON,
		);

		return responseData;
	}
}

export { RoutesService };
