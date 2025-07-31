import { type JSX } from "react";

import { Popup } from "../popup/popup.js";
import { type PointOfInterest } from "../../types/types.js";

type DefaultPopupProperties = {
	coordinates: [number, number];
	data?: PointOfInterest;
};

const DefaultPopup = ({
	coordinates,
	data,
}: DefaultPopupProperties): JSX.Element | null => {
	if (!data) {
		return null;
	}

	return (
		<Popup coordinates={coordinates}>
			<div>
				<h3>{data.name}</h3>
				<p>ID: {data.id}</p>
				<p>
					Coordinates: {data.latitude}, {data.longitude}
				</p>
			</div>
		</Popup>
	);
};

export { DefaultPopup };
