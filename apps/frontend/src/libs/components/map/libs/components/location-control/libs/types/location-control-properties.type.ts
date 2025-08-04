import {
	type BaseControlProperties,
	type LocationFoundEvent,
	type PositionOptions,
} from "../../../../types/shared.type.js";

type LocationControlProperties = BaseControlProperties & {
	autoTrigger?: boolean;
	enabled?: boolean;
	onLocationError?: ((error: string) => void) | undefined;
	onLocationFound?: ((location: LocationFoundEvent) => void) | undefined;
	positionOptions?: PositionOptions;
	showAccuracyCircle?: boolean;
	showUserHeading?: boolean;
	trackUserLocation?: boolean;
};

export { type LocationControlProperties };
