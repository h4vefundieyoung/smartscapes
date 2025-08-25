import { type ReactElement } from "react";

import { type Coordinates } from "./types.js";

type MapMarker = {
	addPopup(content: ReactElement): void;
	remove(): void;
	setCoordinates(coords: Coordinates): void;
};

export { type MapMarker };
