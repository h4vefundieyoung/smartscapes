import { type JSX } from "react";

import { Marker } from "../marker/marker.js";

type DefaultCurrentPositionMarkerProperties = {
	coordinates: [number, number];
	color?: string;
};

const DefaultCurrentPositionMarker = ({
	coordinates,
	color = "#ff00ff", // Bright magenta to make it very visible
}: DefaultCurrentPositionMarkerProperties): JSX.Element | null => {
	console.log("🔵 DefaultCurrentPositionMarker rendered:", {
		coordinates,
		color,
		coordinatesType: typeof coordinates,
		isArray: Array.isArray(coordinates),
		length: coordinates?.length,
		lng: coordinates?.[0],
		lat: coordinates?.[1],
	});

	if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
		console.error(
			"🚫 Invalid coordinates for current position marker:",
			coordinates,
		);
		return null;
	}

	console.log(
		"✅ Creating current position marker with coordinates:",
		coordinates,
	);
	return <Marker coordinates={coordinates} color={color} />;
};
export { DefaultCurrentPositionMarker };
