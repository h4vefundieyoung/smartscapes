import { type Coordinates } from "~/libs/types/types.js";

type MapMarkerOptions = {
	coordinates: Coordinates;
	isDraggable?: boolean;
	onDragEnd?: (coords: Coordinates) => void;
};

export { type MapMarkerOptions };
