import { type MapOptions } from "mapbox-gl";

type MapContextValue = {
	accessToken: MapToken;
};

type MapProviderProperties = {
	accessToken: MapToken;
	children: React.ReactNode;
};

type MapToken = MapOptions["accessToken"] | null;

export { type MapContextValue, type MapProviderProperties };
