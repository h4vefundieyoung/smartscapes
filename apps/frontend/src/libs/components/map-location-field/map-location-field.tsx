import { type PointGeometry } from "@smartscapes/shared";
import React from "react";
import { type Control } from "react-hook-form";

import { Icon, MapProvider } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";
import { useFormController } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestRequestDto } from "~/modules/points-of-interest/points-of-interest.js";

import { MapLocationLogic } from "./map-location-logic/map-location-logic.js";
import styles from "./styles.module.css";

type Properties = {
	control: Control<PointsOfInterestRequestDto>;
	errorMessage?: string;
	label?: string;
	name: "location";
};

const MapLocationField = ({
	control,
	errorMessage,
	label = "Location",
	name,
}: Properties): React.JSX.Element => {
	const { field } = useFormController<PointsOfInterestRequestDto>({
		control,
		name,
	});
	const location = field.value as PointGeometry | undefined;

	const handleLocationChange = React.useCallback(
		(next: PointGeometry) => {
			field.onChange(next);
		},
		[field],
	);

	return (
		<div className={styles["map-field"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<div
				className={combineClassNames(
					styles["map-section"],
					errorMessage && styles["map-section-error"],
				)}
			>
				<MapProvider>
					<MapLocationLogic
						location={location}
						onLocationChange={handleLocationChange}
					/>
				</MapProvider>
			</div>
			{errorMessage && (
				<span className={styles["error"]}>
					<Icon height={24} name="error" width={24} />
					{errorMessage}
				</span>
			)}
		</div>
	);
};

export { MapLocationField };
