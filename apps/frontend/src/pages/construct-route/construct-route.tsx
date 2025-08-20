import { PointsOfInterestValidationRule } from "@smartscapes/shared/src/modules/points-of-interest/libs/enums/points-of-interest-validation-rule.js";
import { type MultiValue, type SingleValue } from "react-select";

import { Button, MapProvider, Select } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type Coordinates, type SelectOption } from "~/libs/types/types.js";
import {
	actions as pointOfInterestActions,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeActions } from "~/modules/routes/routes.js";

import { PointOfInterestCard } from "./libs/components/point-of-interest-card/point-of-interest-card.js";
import styles from "./styles.module.css";

const ConstructRoute = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const filteredPois = useAppSelector(
		(state) => state.pointsOfInterest.dataAll,
	);
	const { control } = useAppForm({
		defaultValues: { searchPoi: null },
	});

	const [selectedPois, setSelectedPois] = useState<
		PointsOfInterestResponseDto[]
	>([]);
	const [markers, setMarkers] = useState<{ coordinates: Coordinates }[]>([]);
	const [selectOptions, setSelectOptions] = useState<
		SelectOption<PointsOfInterestResponseDto>[]
	>([]);

	const handleSelectInputChange = useCallback(
		(value: string) => {
			if (value.length < PointsOfInterestValidationRule.NAME_MIN_LENGTH) {
				setSelectOptions([]);

				return;
			}

			void dispatch(pointOfInterestActions.loadAll({ name: value }));
		},
		[dispatch],
	);

	const handleSelectChange = useCallback(
		(
			option:
				| MultiValue<SelectOption<PointsOfInterestResponseDto>>
				| SingleValue<SelectOption<PointsOfInterestResponseDto>>,
		) => {
			if (Array.isArray(option) || !option) {
				return;
			}

			const { value } = option as SelectOption<PointsOfInterestResponseDto>;

			if (selectedPois.some((poi) => poi.id === value.id)) {
				return;
			}

			setSelectedPois((previous) => [...previous, value]);
		},
		[selectedPois],
	);

	const handleRemovePoiClick = useCallback((id: number): void => {
		setSelectedPois((previous) => previous.filter((poi) => poi.id !== id));
	}, []);

	const handleConstructClick = useCallback(() => {
		const poiIds = selectedPois.map(({ id }) => id);

		void dispatch(routeActions.construct({ poiIds }));
	}, [dispatch, selectedPois]);

	useEffect(() => {
		const newOptions = filteredPois.map((poi) => ({
			label: poi.name,
			value: poi,
		}));
		setSelectOptions(newOptions);
	}, [filteredPois]);

	useEffect(() => {
		const coordinates = selectedPois.map(({ location: { coordinates } }) => ({
			coordinates,
		}));

		setMarkers(coordinates);
	}, [selectedPois]);

	return (
		<>
			<main className={styles["main"]}>
				<div className={styles["map"]}>
					<MapProvider markers={markers} />
				</div>
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

						<Select
							control={control}
							label="Search POI"
							name="searchPoi"
							onChange={handleSelectChange}
							onInputChange={handleSelectInputChange}
							options={selectOptions}
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
