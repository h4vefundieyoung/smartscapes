import { SCALE_CONTROL_PARAMETERS } from "../consts/consts.js";
import {
	type MapboxGL,
	type ScaleControl,
	type ScaleControlOptions,
} from "../types/types.js";

const createScaleControl = (mapClient: MapboxGL): ScaleControl => {
	const scaleControlOptions: ScaleControlOptions = {
		maxWidth: SCALE_CONTROL_PARAMETERS.MAX_WIDTH,
	};

	if (SCALE_CONTROL_PARAMETERS.UNIT) {
		scaleControlOptions.unit = SCALE_CONTROL_PARAMETERS.UNIT;
	}

	return new mapClient.ScaleControl(scaleControlOptions);
};

export { createScaleControl };
