import { MapProvider } from "~/libs/components/components.js";
import {
	useAppSelector,
	useCallback,
	useMemo,
	useState,
} from "~/libs/hooks/hooks.js";
import { type PointsOfInterestGetAllItemResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { SidePanel } from "./libs/components/components.js";
import styles from "./styles.module.css";

const ConstructRoute = (): React.JSX.Element => {
	const routeLineString = useAppSelector(
		(state) => state.constructRoute.routeLineString,
	);
	const [selectedPois, setSelectedPois] = useState<
		PointsOfInterestGetAllItemResponseDto[]
	>([]);

	const handleSelectPoi = useCallback(
		(value: PointsOfInterestGetAllItemResponseDto): void => {
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

	const routeLine = useMemo(() => {
		if (!routeLineString) {
			return null;
		}

		return { geometry: routeLineString.geometry, id: "planned" };
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
