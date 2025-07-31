import { type JSX } from "react";

import { Marker } from "../marker/marker.js";
import { type PointOfInterest } from "../../types/types.js";

type DefaultPoiMarkerProperties = {
	coordinates: [number, number];
	data?: PointOfInterest;
	color?: string;
};

const DefaultPoiMarker = ({
	coordinates,
	data,
	color = "#ff0000",
}: DefaultPoiMarkerProperties): JSX.Element | null => {
	console.log("🔴 DefaultPoiMarker rendered:", {
		coordinates,
		data: data?.name,
		color,
		renderTime: Date.now(),
	});
	return <Marker coordinates={coordinates} color={color} />;
};

export { DefaultPoiMarker };
