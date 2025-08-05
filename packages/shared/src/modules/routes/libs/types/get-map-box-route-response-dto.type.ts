type Coordinate = [number, number];

type GetMapBoxRouteResponseDto = {
	code: string;
	routes: MapBoxRoute[];
	uuid: string;
	waypoints: MapBoxWaypoint[];
};

type MapBoxLegs = {
	admins: {
		iso_3166_1: string;
		iso_3166_1_alpha3: string;
	}[];
	distance: number;
	duration: number;
	summary: string;
	weight: number;
};

type MapBoxRoute = {
	distance: number;
	duration: number;
	geometry: {
		coordinates: Coordinate[];
		type: string;
	};
	legs: MapBoxLegs[];
	weight: number;
	weight_name: string;
};

type MapBoxWaypoint = {
	distance: number;
	location: Coordinate[];
	name: string;
};

export { type Coordinate, type GetMapBoxRouteResponseDto };
