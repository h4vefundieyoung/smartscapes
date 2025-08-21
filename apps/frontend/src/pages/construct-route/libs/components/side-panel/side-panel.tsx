import { PointsOfInterestValidationRule } from "@smartscapes/shared/src/modules/points-of-interest/libs/enums/points-of-interest-validation-rule.js";
import { type MultiValue, type SingleValue } from "react-select";

import { Button, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useDebouncedCallback,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeActions } from "~/modules/routes/routes.js";

import { selectStylesConfig } from "../../constants/constants.js";
import { PointOfInterestCard } from "../point-of-interest-card/point-of-interest-card.js";
import { SearchIcon } from "../search-icon/search-icon.js";
import styles from "./styles.module.css";

type Properties = {
	onRemovePoi: (id: number) => void;
	onSelectPoi: (value: PointsOfInterestResponseDto) => void;
	pointsOfInterest: PointsOfInterestResponseDto[];
};

const SidePanel = ({
	onRemovePoi,
	onSelectPoi,
	pointsOfInterest,
}: Properties): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus, pointsOfInterest: filteredPois } = useAppSelector(
		(state) => state.constructRoute,
	);
	const { control } = useAppForm({
		defaultValues: { searchPoi: null },
	});

	const handleSelectInputChange = useDebouncedCallback((value: string) => {
		if (
			value.trim().length < PointsOfInterestValidationRule.NAME_MIN_LENGTH ||
			value.trim().length > PointsOfInterestValidationRule.NAME_MAX_LENGTH
		) {
			return;
		}

		void dispatch(routeActions.getPointsOfInterest({ name: value }));
	});

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

			onSelectPoi(value);
		},
		[onSelectPoi],
	);

	const handleRemovePoiClick = useCallback(
		(id: number): void => {
			onRemovePoi(id);
		},
		[onRemovePoi],
	);

	const handleConstructClick = useCallback(() => {
		const poiIds = pointsOfInterest.map(({ id }) => id);

		void dispatch(routeActions.constructRoute({ poiIds }));
	}, [dispatch, pointsOfInterest]);

	const selectOptions = useMemo(() => {
		return filteredPois.map((poi) => ({
			label: poi.name,
			value: poi,
		}));
	}, [filteredPois]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
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
					additionalStyles={selectStylesConfig}
					components={{ DropdownIndicator: SearchIcon }}
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
						{pointsOfInterest.map((point) => (
							<PointOfInterestCard
								key={point.id}
								onClick={handleRemovePoiClick}
								pointOfInterest={point}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export { SidePanel };
