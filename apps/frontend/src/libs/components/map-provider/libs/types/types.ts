import { type default as mapboxgl, type MapOptions } from "mapbox-gl";

type MapboxGL = typeof mapboxgl;

type MapBoxGLWithToken = MapboxGL & { accessToken: MapToken };

type MapContextValue = {
	accessToken: MapToken;
	mapClient: MapboxGL | null;
};

type MapProviderProperties = {
	accessToken: MapToken;
	children: React.ReactNode;
};

type MapToken = MapOptions["accessToken"] | null;

export {
	type MapBoxGLWithToken,
	type MapContextValue,
	type MapProviderProperties,
};
