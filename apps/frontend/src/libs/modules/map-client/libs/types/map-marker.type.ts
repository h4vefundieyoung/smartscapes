import { type Coordinates } from "~/libs/types/types.js";

type MapMarker = {
	remove(): void;
	setCoordinates(coords: Coordinates): void;
};

export { type MapMarker };
