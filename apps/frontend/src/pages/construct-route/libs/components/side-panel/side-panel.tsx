import { PointsOfInterestValidationRule } from "@smartscapes/shared/src/modules/points-of-interest/libs/enums/points-of-interest-validation-rule.js";
import { type MultiValue, type SingleValue } from "react-select";

import { Button, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useAppNavigate,
	useAppSelector,
	useCallback,
	useDebouncedFunction,
	useMemo,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import { type PointsOfInterestGetAllItemResponseDto } from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeActions } from "~/modules/routes/routes.js";
import { preserveCreateRouteFormData } from "~/modules/routes/slices/actions.js";

import { PointOfInterestCard } from "../point-of-interest-card/point-of-interest-card.js";
import styles from "./styles.module.css";

type Properties = {
	isSaveDisabled: boolean;
	onRemovePoi: (id: number) => void;
	onSelectPoi: (value: PointsOfInterestGetAllItemResponseDto) => void;
	plannedRouteId: null | number;
	pointsOfInterest: PointsOfInterestGetAllItemResponseDto[];
};

const SidePanel = ({
	isSaveDisabled,
	onRemovePoi,
	onSelectPoi,
	plannedRouteId,
	pointsOfInterest,
}: Properties): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();
	const [searchParameters] = useSearchParams();
	const { dataStatus, pointsOfInterest: filteredPois } = useAppSelector(
		(state) => state.constructRoute,
	);
	const { control } = useAppForm({
		defaultValues: { poiName: null },
	});

	const handleSelectInputChange = useDebouncedFunction((value: string) => {
		if (
			value.trim().length < PointsOfInterestValidationRule.NAME_MIN_LENGTH ||
			value.trim().length > PointsOfInterestValidationRule.NAME_MAX_LENGTH
		) {
			return;
		}

		void dispatch(routeActions.findPointsOfInterest({ search: value }));
	});

	const handlePoiSelectChange = useCallback(
		(
			option:
				| MultiValue<SelectOption<PointsOfInterestGetAllItemResponseDto>>
				| SingleValue<SelectOption<PointsOfInterestGetAllItemResponseDto>>,
		) => {
			if (Array.isArray(option) || !option) {
				return;
			}

			const { value } =
				option as SelectOption<PointsOfInterestGetAllItemResponseDto>;

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

	const handleBuildClick = useCallback(() => {
		const poiIds = pointsOfInterest.map(({ id }) => id);
		void dispatch(routeActions.constructRoute({ poiIds }));
	}, [dispatch, pointsOfInterest]);

	const handleSaveClick = useCallback(() => {
		const route = searchParameters.get("returnTo");

		if (!route || !plannedRouteId) {
			return;
		}

		const poiIds = pointsOfInterest.map(({ id }) => id);

		void dispatch(
			preserveCreateRouteFormData({ plannedPathId: plannedRouteId, poiIds }),
		);

		const [path, query = ""] = route.split("?");
		const newSearchParameters = new URLSearchParams(query);
		newSearchParameters.set("plannedRouteId", String(plannedRouteId));

		navigate(`${String(path)}?${newSearchParameters.toString()}`);
	}, [dispatch, plannedRouteId, pointsOfInterest, searchParameters, navigate]);

	const poiSelectOptions = useMemo(() => {
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
						isDisabled={isSaveDisabled}
						label="Save"
						onClick={handleSaveClick}
						type="button"
					/>
				</div>

				<Select
					control={control}
					iconLeft="search"
					isLoading={isLoading}
					label="Search POI"
					name="poiName"
					onChange={handlePoiSelectChange}
					onInputChange={handleSelectInputChange}
					options={poiSelectOptions}
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
				<div className={styles["footer"]}>
					<Button label="Build path" onClick={handleBuildClick} type="button" />
				</div>
			</div>
		</div>
	);
};

export { SidePanel };
