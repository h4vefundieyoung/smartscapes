import { MapProvider } from "~/libs/components/components.js";
import {
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "~/libs/hooks/hooks.js";
import { type RouteLine } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { SidePanel } from "./libs/components/side-panel/side-panel.js";
import styles from "./styles.module.css";

const ConstructRoute = (): React.JSX.Element => {
	const { routeLineString } = useAppSelector((state) => state.constructRoute);
	const [selectedPois, setSelectedPois] = useState<
		PointsOfInterestResponseDto[]
	>([]);
	const [routeLine, setRouteLine] = useState<null | RouteLine>(null);

	const handleSelectPoi = useCallback(
		(value: PointsOfInterestResponseDto): void => {
			if (selectedPois.some((poi) => poi.id === value.id)) {
				return;
			}

			setSelectedPois((previous) => [...previous, value]);
		},
		[selectedPois],
	);

	const handleRemovePoi = useCallback((id: number): void => {
		setSelectedPois((previous) => previous.filter((poi) => poi.id !== id));
	}, []);

	const markers = useMemo(() => {
		return selectedPois.map(({ location: { coordinates } }) => ({
			coordinates,
		}));
	}, [selectedPois]);

	useEffect(() => {
		if (!routeLineString) {
			return;
		}

		setRouteLine({ geometry: routeLineString.geometry, id: "planned" });
	}, [routeLineString]);

	return (
		<main className={styles["main"]}>
			<div className={styles["map"]}>
				<MapProvider markers={markers} routeLine={routeLine} />
			</div>
			<SidePanel
				onRemovePoi={handleRemovePoi}
				onSelectPoi={handleSelectPoi}
				pointsOfInterest={selectedPois}
			/>
		</main>
	);
};

export { ConstructRoute };
