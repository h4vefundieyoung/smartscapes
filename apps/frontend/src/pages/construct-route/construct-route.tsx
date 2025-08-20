import { PointsOfInterestValidationRule } from "@smartscapes/shared/src/modules/points-of-interest/libs/enums/points-of-interest-validation-rule.js";
import { type MultiValue, type SingleValue } from "react-select";

import { Button, MapProvider, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useDebounce,
	useEffect,
	useMemo,
	useState,
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import {
	actions as pointOfInterestActions,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeActions } from "~/modules/routes/routes.js";

import { PointOfInterestCard } from "./libs/components/point-of-interest-card/point-of-interest-card.js";
import styles from "./styles.module.css";

const ConstructRoute = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataAll: filteredPois, dataStatus } = useAppSelector(
		(state) => state.pointsOfInterest,
	);
	const { control } = useAppForm({
		defaultValues: { searchPoi: null },
	});

	const [selectedPois, setSelectedPois] = useState<
		PointsOfInterestResponseDto[]
	>([]);
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchValue = useDebounce(searchValue);

	const handleSelectInputChange = useCallback((value: string) => {
		setSearchValue(value);
	}, []);

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

	const selectOptions = useMemo(() => {
		return filteredPois.map((poi) => ({
			label: poi.name,
			value: poi,
		}));
	}, [filteredPois]);

	const markers = useMemo(() => {
		return selectedPois.map(({ location: { coordinates } }) => ({
			coordinates,
		}));
	}, [selectedPois]);

	const isLoading = dataStatus === DataStatus.PENDING;

	useEffect(() => {
		if (
			debouncedSearchValue.length <
				PointsOfInterestValidationRule.NAME_MIN_LENGTH ||
			debouncedSearchValue.length >
				PointsOfInterestValidationRule.NAME_MAX_LENGTH
		) {
			return;
		}

		void dispatch(
			pointOfInterestActions.loadAll({ name: debouncedSearchValue }),
		);
	}, [debouncedSearchValue, dispatch]);

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
							isLoading={isLoading}
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
