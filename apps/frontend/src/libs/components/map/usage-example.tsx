import { useState, type JSX } from "react";

import { Map } from "./map.js";

// Basic usage example
const BasicMapExample = (): JSX.Element => {
	return <Map />;
};

// Map with controls example
const MapWithControlsExample = (): JSX.Element => {
	return (
		<Map
			center={[-74.006, 40.7128]}
			zoom={14}
			zoomControl={true}
			scaleControl={true}
			locationControl={true}
		/>
	);
};

// Map with current position example
const MapWithCurrentPositionExample = (): JSX.Element => {
	const [currentPosition, setCurrentPosition] = useState<
		[number, number] | null
	>(null);

	return (
		<Map
			currentPosition={currentPosition}
			currentPositionColor="#00ff00"
			locationControl={true}
			onLocationFound={(pos) =>
				setCurrentPosition([pos.longitude, pos.latitude])
			}
			onLocationError={(error) => console.error(error)}
		/>
	);
};

// All controls example
const AllControlsExample = (): JSX.Element => {
	const [currentPosition, setCurrentPosition] = useState<
		[number, number] | null
	>([-74.006, 40.7128]);

	return (
		<Map
			center={[-74.006, 40.7128]}
			zoom={15}
			currentPosition={currentPosition}
			currentPositionColor="#ff0000"
			zoomControl={true}
			zoomControlPosition="top-right"
			showCompass={true}
			scaleControl={true}
			scaleControlPosition="bottom-left"
			scaleControlUnit="metric"
			locationControl={true}
			locationControlPosition="top-left"
			onLocationFound={(pos) => {
				console.log("Found:", pos);
				setCurrentPosition([pos.longitude, pos.latitude]);
			}}
			onLocationError={(err) => console.error("Error:", err)}
			onMapReady={(map) => console.log("Map ready:", map)}
		/>
	);
};

export {
	BasicMapExample,
	MapWithControlsExample,
	MapWithCurrentPositionExample,
	AllControlsExample,
};
