import { useEffect, useState } from "react";

import {
	Header,
	Map,
	type PointOfInterest,
} from "~/libs/components/components.js";
import { useNavigation } from "~/libs/hooks/hooks.js";

import { HeroSection } from "./libs/components/hero-section/hero-section.jsx";
import { PopularSection } from "./libs/components/popular-section/popular-section.js";
import styles from "./styles.module.css";

// Mock POI data for the landing page - Lviv landmarks
const mockPointsOfInterest: PointOfInterest[] = [
	{
		id: 1,
		latitude: 49.8419,
		longitude: 24.0315,
		name: "Lviv Opera House",
	},
	{
		id: 2,
		latitude: 49.8421,
		longitude: 24.0322,
		name: "Market Square (Rynok Square)",
	},
	{
		id: 3,
		latitude: 49.8429,
		longitude: 24.0297,
		name: "Latin Cathedral",
	},
	{
		id: 4,
		latitude: 49.8448,
		longitude: 24.0297,
		name: "High Castle Hill",
	},
	{
		id: 5,
		latitude: 49.8383,
		longitude: 24.0253,
		name: "Lviv Railway Station",
	},
	{
		id: 6,
		latitude: 49.8403,
		longitude: 24.0289,
		name: "Dominican Church",
	},
	{
		id: 7,
		latitude: 49.8437,
		longitude: 24.0336,
		name: "Armenian Cathedral",
	},
	{
		id: 8,
		latitude: 49.8451,
		longitude: 24.0318,
		name: "Lychakiv Cemetery",
	},
];

const Landing = (): React.JSX.Element => {
	const { state, startWatchingPosition, stopWatchingPosition } =
		useNavigation();
	const [userPosition, setUserPosition] = useState<[number, number] | null>(
		// Fallback to Lviv city center for testing
		[24.0322, 49.8421],
	);
	const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(new Date());

	useEffect(() => {
		console.log("📍 Position state change:", {
			hasStatePosition: !!state.currentPosition,
			statePosition: state.currentPosition,
			currentUserPosition: userPosition,
		});

		if (state.currentPosition) {
			const newPosition: [number, number] = [
				state.currentPosition.longitude,
				state.currentPosition.latitude,
			];

			// Only update if position changed significantly (> 10 meters)
			if (
				!userPosition ||
				Math.abs(userPosition[0] - newPosition[0]) > 0.0001 ||
				Math.abs(userPosition[1] - newPosition[1]) > 0.0001
			) {
				console.log("📍 Setting new user position:", newPosition);
				setUserPosition(newPosition);
				setLastUpdateTime(new Date());
			} else {
				console.log("📍 Position change too small, skipping update");
			}
		} else {
			console.log("📍 No state.currentPosition available");
		}
	}, [state.currentPosition]); // Removed userPosition from dependencies

	const handleLocationFound = (position: {
		latitude: number;
		longitude: number;
	}): void => {
		const newPosition: [number, number] = [
			position.longitude,
			position.latitude,
		];

		// Only update if position changed significantly
		if (
			!userPosition ||
			Math.abs(userPosition[0] - newPosition[0]) > 0.0001 ||
			Math.abs(userPosition[1] - newPosition[1]) > 0.0001
		) {
			setUserPosition(newPosition);
			setLastUpdateTime(new Date());
			console.log("📍 Location found via map control:", position);
		}
	};

	const handleLocationError = (error: string): void => {
		console.error("🚫 Location error:", error);
	};

	if (state.isLoading) {
		return (
			<main className={styles["landing"]}>
				<Header user={null} />
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "400px",
						fontSize: "18px",
					}}
				>
					Getting your location...
				</div>
				<HeroSection />
				<PopularSection />
			</main>
		);
	}

	if (state.error) {
		console.error("Navigation error:", state.error);
	}

	return (
		<main className={styles["landing"]}>
			<Header user={null} />
			{userPosition && lastUpdateTime && (
				<div
					style={{
						position: "fixed",
						top: "10px",
						right: "10px",
						background: "rgba(0, 0, 0, 0.7)",
						color: "white",
						padding: "8px 12px",
						borderRadius: "6px",
						fontSize: "12px",
						zIndex: 1000,
					}}
				>
					📍 Position: {userPosition[1].toFixed(4)},{" "}
					{userPosition[0].toFixed(4)}
					<br />
					🕒 Updated: {lastUpdateTime.toLocaleTimeString()}
				</div>
			)}
			{(() => {
				console.log("🗺️ Map props:", {
					pois: mockPointsOfInterest.length,
					userPosition,
					hasCurrentPosition: !!userPosition,
					currentPositionValue: userPosition,
				});
				return null;
			})()}
			<Map
				pois={mockPointsOfInterest}
				poisMarker="default"
				isPoisRoute={true}
				{...(userPosition && {
					currentPosition: userPosition,
				})}
				currentPositionMarker="default"
				isPopup={false}
				isZoomControl={true}
				zoomControlPosition="top-right"
				isScaleControl={true}
				scaleControlPosition="bottom-left"
				isLocationControl={true}
				locationControlPosition="top-left"
				onLocationFound={handleLocationFound}
				onLocationError={handleLocationError}
				{...(userPosition && { center: userPosition })}
			/>
			<HeroSection />
			<PopularSection />
		</main>
	);
};

export { Landing };
