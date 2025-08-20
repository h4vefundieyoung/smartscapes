import { type Coordinates } from "./types.js";

type MapMarker = {
	remove(): void;
	setCoordinates(coords: Coordinates): void;
};

export { type MapMarker };
