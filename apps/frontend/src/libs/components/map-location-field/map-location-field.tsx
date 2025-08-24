import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { FieldError, MapProvider } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";
import { useFormController } from "~/libs/hooks/hooks.js";
import { type Coordinates, type PointGeometry } from "~/libs/types/types.js";

import { MapLocationLogic } from "./map-location-logic/map-location-logic.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	center?: Coordinates;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
};

const MapLocationField = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
}: Properties<T>): React.JSX.Element => {
	const { field } = useFormController<T>({ control, name });
	const location = field.value as PointGeometry;

	const handleLocationChange = React.useCallback(
		(next: PointGeometry) => {
			field.onChange(next);
		},
		[field],
	);
	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<div className={styles["map-field"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<div
				className={combineClassNames(
					styles["map-section"],
					error && styles["map-section-error"],
				)}
			>
				<MapProvider>
					<MapLocationLogic
						location={location}
						onLocationChange={handleLocationChange}
					/>
				</MapProvider>
			</div>
			{hasError && <FieldError description={error as string} />}
		</div>
	);
};

export { MapLocationField };
