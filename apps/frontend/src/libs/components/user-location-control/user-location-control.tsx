import { useEffect } from "react";

import { Button } from "~/libs/components/components.js";
import { useNavigation } from "~/libs/hooks/hooks.js";
import { positionToMapboxCoordinates } from "~/libs/modules/modules.js";

import styles from "./styles.module.css";

type Properties = {
	onLocationUpdate?: (coordinates: [number, number]) => void;
	onError?: (error: string) => void;
};

const UserLocationControl = ({
	onLocationUpdate,
	onError,
}: Properties): React.JSX.Element => {
	const { getCurrentPosition, state } = useNavigation();

	const { currentPosition, isLoading, error } = state;

	useEffect((): void => {
		if (currentPosition && onLocationUpdate) {
			const coordinates = positionToMapboxCoordinates(currentPosition);
			onLocationUpdate(coordinates);
		}
	}, [currentPosition, onLocationUpdate]);

	useEffect((): void => {
		if (error && onError) {
			onError(error.message);
		}
	}, [error, onError]);

	const handleGetCurrentLocation = async (): Promise<void> => {
		try {
			await getCurrentPosition();
		} catch (err) {
			// Error is already handled in the hook
		}
	};

	return (
		<div className={styles["user-location-control"]}>
			<Button
				label={
					isLoading
						? "Getting Location..."
						: currentPosition
							? "Update Location"
							: "Get My Location"
				}
				onClick={handleGetCurrentLocation}
				type="button"
			/>
			{currentPosition && (
				<div className={styles["location-info"]}>
					<p className={styles["coordinates"]}>
						Lat: {currentPosition.latitude.toFixed(6)}, Lon:{" "}
						{currentPosition.longitude.toFixed(6)}
					</p>
				</div>
			)}
			{error && (
				<div className={styles["error"]}>
					<p>{error.message}</p>
				</div>
			)}
		</div>
	);
};

export { UserLocationControl };
