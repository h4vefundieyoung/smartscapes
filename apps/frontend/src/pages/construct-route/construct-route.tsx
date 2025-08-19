import { PointsOfInterestValidationRule } from "@smartscapes/shared/src/modules/points-of-interest/libs/enums/points-of-interest-validation-rule.js";
import {
	type GroupBase,
	type OptionsOrGroups,
	type SingleValue,
} from "react-select";
import AsyncSelect from "react-select/async";

import { Button, MapProvider } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type Coordinates } from "~/libs/types/types.js";
import {
	actions as pointOfInterestActions,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeActions } from "~/modules/routes/routes.js";

import { PointOfInterestCard } from "./libs/components/point-of-interest-card/point-of-interest-card.js";
import styles from "./styles.module.css";

type SelectOption = {
	label: string;
	value: PointsOfInterestResponseDto;
};

const ConstructRoute = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const [selectedPois, setSelectedPois] = useState<
		PointsOfInterestResponseDto[]
	>([]);
	const [markers, setMarkers] = useState<{ coordinates: Coordinates }[]>([]);
	const [selectValue, setSelectValue] = useState<null | SelectOption>(null);

	const loadOptions = useCallback(
		async (
			inputValue: string,
		): Promise<OptionsOrGroups<SelectOption, GroupBase<SelectOption>>> => {
			if (inputValue.length < PointsOfInterestValidationRule.NAME_MIN_LENGTH) {
				return [];
			}

			const result = await dispatch(
				pointOfInterestActions.loadAll({ name: inputValue }),
			).unwrap();

			const options = result.data.map((point) => ({
				label: point.name,
				value: point,
			}));

			return options;
		},
		[dispatch],
	);

	const handleChange = useCallback(
		(option: SingleValue<SelectOption>): void => {
			if (!option) {
				return;
			}

			setSelectedPois((previous) => [...previous, option.value]);
			setSelectValue(null);
		},
		[],
	);

	const handleRemovePoiClick = useCallback((id: number): void => {
		setSelectedPois((previous) => previous.filter((poi) => poi.id !== id));
	}, []);

	const handleConstructClick = useCallback(() => {
		const poiIds = selectedPois.map(({ id }) => id);

		void dispatch(routeActions.construct({ poiIds }));
	}, [dispatch, selectedPois]);

	useEffect(() => {
		const coordinates = selectedPois.map(({ location: { coordinates } }) => ({
			coordinates,
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
