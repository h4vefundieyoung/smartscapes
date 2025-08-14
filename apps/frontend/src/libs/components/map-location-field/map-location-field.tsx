import { type PointGeometry } from "@smartscapes/shared";
import { LocationType } from "@smartscapes/shared/src/libs/enums/location-type.enum.js";
import React from "react";
import { type Control } from "react-hook-form";

import { MapContext } from "~/libs/components/map-provider/map-provider.js";
import {
	useContext,
	useEffect,
	useFormController,
} from "~/libs/hooks/hooks.js";
import { type PointsOfInterestRequestDto } from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

type Properties = {
	control: Control<PointsOfInterestRequestDto>;
	name: "location";
};

const MapLocationField = ({ control, name }: Properties): React.JSX.Element => {
	const { field } = useFormController<PointsOfInterestRequestDto>({
		control,
		name,
	});
	const mapClient = useContext(MapContext);

	useEffect(() => {
		if (!mapClient) {
			return;
		}

		const pointGeometry = field.value as PointGeometry | undefined;
		const coordinates = pointGeometry?.coordinates;

		if (!coordinates) {
			mapClient.clearSelected();

			return;
		}

		mapClient.setSelected(coordinates);
	}, [mapClient, field.value]);

	useEffect((): (() => void) | undefined => {
		if (!mapClient) {
			return;
		}

		const cleanup = mapClient.enableClickToSelect((coordinates) => {
			field.onChange({
				coordinates,
				type: LocationType.POINT,
			} as PointGeometry);
		});

		return cleanup;
	}, [mapClient, field]);

	return <div className={styles["wrapper"]} />;
};

export { MapLocationField };
