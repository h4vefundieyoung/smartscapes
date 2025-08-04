import { ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type Config } from "~/libs/modules/config/config.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

import { MAPBOX_URL } from "./libs/constants/constants.js";
import {
	type MapBoxAPIGeometricsType,
	MapBoxAPIPaths,
	type MapBoxAPIProfiles,
} from "./libs/enums/enums.js";
import {
	type Coordinate,
	type GetMapBoxRouteResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	config: Config;
	http: HTTP;
};

class MapBoxDirectionsApi extends BaseHTTPApi {
	private accessToken: string;

	public constructor({ config, http }: Constructor) {
		super({ baseUrl: MAPBOX_URL, http, path: MapBoxAPIPaths.DIRECTIONS });
		this.accessToken = config.ENV.MAPBOX_DIRECTIONS_API.MAPBOX_ACCESS_TOKEN;
	}

	public async getRoute(
		profile: ValueOf<typeof MapBoxAPIProfiles>,
		coordinates: Coordinate[],
		geometricsType: ValueOf<typeof MapBoxAPIGeometricsType>,
	): Promise<GetMapBoxRouteResponseDto> {
		const URLCoords = coordinates
			.map((coordinate) => `${coordinate.join(",")};`)
			.join("");
		const URL = `${profile}/${URLCoords}`;

		const response = await this.load<GetMapBoxRouteResponseDto>(
			this.getFullEndpoint(URL, {
				access_token: this.accessToken,
				geometries: geometricsType,
			}),
			{
				contentType: ContentType.JSON,
				method: "GET",
			},
		);

		return await response.json();
	}
}

export { MapBoxDirectionsApi };
