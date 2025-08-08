import React, { useState } from "react";

import { useMapClient } from "~/libs/hooks/use-map-client/use-map-client.hook.js";

import styles from "./styles.module.css";

const MapShowcase = (): React.JSX.Element => {
	const mapClient = useMapClient(); // Using our hook!
	const [markerCount, setMarkerCount] = useState(0);

	// Sample locations around the world
	const sampleLocations = [
		{
			id: "kyiv",
			coordinates: [30.5234, 50.4501] as [number, number],
			name: "Kyiv",
		},
		{
			id: "london",
			coordinates: [-0.1276, 51.5074] as [number, number],
			name: "London",
		},
		{
			id: "nyc",
			coordinates: [-74.006, 40.7128] as [number, number],
			name: "New York",
		},
		{
			id: "tokyo",
			coordinates: [139.6917, 35.6895] as [number, number],
			name: "Tokyo",
		},
	];

	const handleFlyToLocation = (coordinates: [number, number], name: string) => {
		mapClient.flyTo(coordinates, 10);
		console.log(`Flying to ${name}`);
	};

	const handleAddRandomMarker = () => {
		const randomLat = (Math.random() - 0.5) * 180;
		const randomLng = (Math.random() - 0.5) * 360;
		const markerId = `marker-${markerCount}`;

		mapClient.addMarker(markerId, {
			coordinates: [randomLng, randomLat],
		});

		setMarkerCount(markerCount + 1);
		console.log(
			`Added marker ${markerId} at [${randomLng.toFixed(2)}, ${randomLat.toFixed(2)}]`,
		);
	};

	const handleClearMarkers = () => {
		mapClient.clearAllMarkers();
		setMarkerCount(0);
		console.log("Cleared all markers");
	};

	const handleAddSampleMarkers = () => {
		sampleLocations.forEach(({ id, coordinates, name }) => {
			mapClient.addMarker(id, { coordinates });
		});
		console.log("Added sample markers for major cities");
	};

	return (
		<div className={styles["map-showcase"]}>
			<h3>Map Showcase - useMapClient Hook Demo</h3>

			<div className={styles["controls"]}>
				<div className={styles["section"]}>
					<h4>Navigate to Cities:</h4>
					{sampleLocations.map(({ id, coordinates, name }) => (
						<button
							key={id}
							onClick={() => handleFlyToLocation(coordinates, name)}
							className={styles["control-button"]}
						>
							Fly to {name}
						</button>
					))}
				</div>

				<div className={styles["section"]}>
					<h4>Marker Controls:</h4>
					<button
						onClick={handleAddSampleMarkers}
						className={styles["control-button"]}
					>
						Add City Markers
					</button>
					<button
						onClick={handleAddRandomMarker}
						className={styles["control-button"]}
					>
						Add Random Marker ({markerCount})
					</button>
					<button
						onClick={handleClearMarkers}
						className={styles["control-button"]}
					>
						Clear All Markers
					</button>
				</div>
			</div>

			<div className={styles["info"]}>
				<p>
					<strong>useMapClient Hook Features:</strong>
				</p>
				<ul>
					<li>✅ Type-safe MapClient access (no null checks needed)</li>
					<li>✅ Throws error if used outside MapProvider</li>
					<li>✅ Direct access to all map methods</li>
					<li>📍 Current markers: {markerCount}</li>
				</ul>
			</div>
		</div>
	);
};

export { MapShowcase };
