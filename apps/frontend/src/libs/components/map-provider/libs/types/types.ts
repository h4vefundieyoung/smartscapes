import { type default as mapboxgl } from "mapbox-gl";

type MapContextValue = {
	accessToken: null | string;
	mapClient: null | typeof mapboxgl;
};

type MapProviderProperties = {
	accessToken: string;
	children: React.ReactNode;
};

export { type MapContextValue, type MapProviderProperties };
