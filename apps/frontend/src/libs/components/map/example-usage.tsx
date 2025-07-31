import { type JSX } from "react";
import {
	Map,
	type PointOfInterest,
	DefaultPoiMarker,
	DefaultCurrentPositionMarker,
	DefaultPopup,
} from "./map.js";

// Example usage of the refactored Map component

const ExampleMapUsage = (): JSX.Element => {
	// Sample POIs data
	const pois: PointOfInterest[] = [
		{ id: 1, name: "Central Park", latitude: 40.785091, longitude: -73.968285 },
		{ id: 2, name: "Times Square", latitude: 40.758896, longitude: -73.98513 },
		{
			id: 3,
			name: "Statue of Liberty",
			latitude: 40.689247,
			longitude: -74.044502,
		},
	];

	// Sample current position
	const currentPosition: [number, number] = [-73.968285, 40.785091];

	return (
		<div>
			{/* Basic map with POIs */}
			<Map
				pois={pois}
				poisMarker="default" // or custom component
				isPoisRoute={true}
				currentPosition={currentPosition}
				currentPositionMarker="default" // or custom component
				isPopup={true}
				popup="default" // or custom component
				isZoomControl={true}
				zoomControlPosition="top-right"
				showCompass={true}
				isScaleControl={true}
				scaleControlPosition="bottom-left"
				scaleControlMaxWidth={100}
				scaleControlUnit="metric"
				isRotationControl={false}
				center={[-73.968285, 40.785091]}
				zoom={12}
			/>

			{/* Map with custom marker components */}
			<Map
				pois={pois}
				poisMarker={({ coordinates, data }) => (
					<div style={{ color: "red" }}>Custom POI: {data?.name}</div>
				)}
				currentPosition={currentPosition}
				currentPositionMarker={({ coordinates }) => (
					<div style={{ color: "blue" }}>You are here</div>
				)}
				isPopup={true}
				popup={({ coordinates, data }) => (
					<div
						style={{
							padding: "10px",
							background: "white",
							borderRadius: "5px",
						}}
					>
						<h4>{data?.name}</h4>
						<p>Custom popup content</p>
					</div>
				)}
			/>

			{/* Minimal map with just controls */}
			<Map
				isZoomControl={true}
				isScaleControl={true}
				center={[-73.968285, 40.785091]}
				zoom={10}
			/>
		</div>
	);
};

export { ExampleMapUsage };
