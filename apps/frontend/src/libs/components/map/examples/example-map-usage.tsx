import { type JSX } from "react";

import {
	Map,
	type PointOfInterest,
	type CustomMarkerProps,
} from "~/libs/components/map/map.js";
import { navigation } from "~/libs/modules/modules.js";

// Example custom marker component
const CustomPoiMarker = ({
	coordinates,
	data,
}: CustomMarkerProps): JSX.Element | null => {
	return (
		<div
			style={{
				position: "absolute",
				transform: "translate(-50%, -100%)",
				background: "red",
				color: "white",
				padding: "4px 8px",
				borderRadius: "4px",
				fontSize: "12px",
			}}
		>
			{data?.name || "POI"}
		</div>
	);
};

const ExampleMapUsage = (): JSX.Element => {
	// Example POIs data
	const pois: PointOfInterest[] = [
		{ id: 1, name: "Location 1", latitude: 40.7128, longitude: -74.006 },
		{ id: 2, name: "Location 2", latitude: 40.7589, longitude: -73.9851 },
		{ id: 3, name: "Location 3", latitude: 40.7505, longitude: -73.9934 },
	];

	// Example current position
	const currentPosition: [number, number] = [-74.006, 40.7128];

	return (
		<div>
			{/* Basic usage with default components */}
			<Map
				pois={pois}
				poisMarker="default"
				isPoisRoute={true}
				currentPosition={currentPosition}
				currentPositionMarker="default"
				isPopup={true}
				popup="default"
				isZoomControl={true}
				zoomControlPosition="top-right"
				showCompass={true}
				isScaleControl={true}
				scaleControlPosition="bottom-left"
				scaleControlUnit="metric"
				isRotationControl={false}
			/>

			{/* Advanced usage with custom components */}
			<Map
				pois={pois}
				poisMarker={CustomPoiMarker}
				isPoisRoute={false}
				currentPosition={currentPosition}
				isPopup={false}
				isZoomControl={true}
				zoomControlPosition="top-left"
				isScaleControl={false}
			/>
		</div>
	);
};

export { ExampleMapUsage };
