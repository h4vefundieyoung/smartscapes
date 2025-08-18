import {
	type GroupBase,
	type OptionsOrGroups,
	type SingleValue,
} from "react-select";
import AsyncSelect from "react-select/async";

import { Button, MapProvider } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type Coordinates } from "~/libs/types/types.js";
import {
	actions as pointOfInterestActions,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { PointOfInterestCard } from "./libs/components/point-of-interest-card/point-of-interest-card.js";
import styles from "./styles.module.css";

type SelectOption = {
	label: string;
	value: PointsOfInterestResponseDto;
};

const ConstructRoute = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const pointsOfInterest = useAppSelector(
		(state) => state.pointsOfInterest.dataAll,
	);
	const [selectedPois, setSelectedPois] = useState<
		PointsOfInterestResponseDto[]
	>([]);
	const [markers, setMarkers] = useState<{ coordinates: Coordinates }[]>([]);
	const [selectValue, setSelectValue] = useState<null | SelectOption>(null);

	const loadOptions = useCallback(
		async (
			inputValue: string,
		): Promise<OptionsOrGroups<SelectOption, GroupBase<SelectOption>>> => {
			try {
				await dispatch(pointOfInterestActions.loadAll({ name: inputValue }));

				const options = pointsOfInterest.map((point) => ({
					label: point.name,
					value: point,
				}));

				return options;
			} catch {
				return [];
			}
		},
		[dispatch, pointsOfInterest],
	);

	const handleChange = useCallback(
		(newValue: SingleValue<SelectOption>): void => {
			if (!newValue) {
				return;
			}

			setSelectedPois((previous) => [...previous, newValue.value]);
			setSelectValue(null);
		},
		[],
	);

	const handleRemovePoiClick = useCallback((id: number): void => {
		setSelectedPois((previous) => previous.filter((poi) => poi.id !== id));
	}, []);

	const handleConstructClick = useCallback(() => {}, []);

	useEffect(() => {
		const coordinates = selectedPois.map((poi) => ({
			coordinates: poi.location.coordinates,
		}));
		setMarkers(coordinates);
	}, [selectedPois]);

	return (
		<>
			<main className={styles["main"]}>
				<MapProvider markers={markers} />
				<div className={styles["container"]}>
					<div className={styles["panel"]}>
						<div className={styles["header"]}>
							<h2 className={styles["title"]}>Construct route</h2>
							<Button
								label="Construct"
								onClick={handleConstructClick}
								type="button"
							/>
						</div>

						<AsyncSelect
							cacheOptions
							loadOptions={loadOptions}
							onChange={handleChange}
							value={selectValue}
						/>

						<div className={styles["body"]}>
							<span className={styles["list-title"]}>POIs</span>
							<ul className={styles["list"]}>
								{selectedPois.map((poi) => (
									<PointOfInterestCard
										key={poi.id}
										onClick={handleRemovePoiClick}
										pointOfInterest={poi}
									/>
								))}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export { ConstructRoute };
