import type mapboxgl from "mapbox-gl";

type MapContextValue = {
	accessToken: string | null;
	mapClient: typeof mapboxgl | null;
};

type MapProviderProperties = {
	accessToken: string;
	children: React.ReactNode;
};

export { type MapContextValue, type MapProviderProperties };
