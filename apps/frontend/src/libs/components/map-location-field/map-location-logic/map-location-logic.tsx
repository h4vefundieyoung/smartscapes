import { LocationType, type PointGeometry } from "@smartscapes/shared";

import { useEffect, useMapClient } from "~/libs/hooks/hooks.js";

type Properties = {
	location: PointGeometry | undefined;
	onLocationChange: (next: PointGeometry) => void;
};

const MapLocationLogic = ({ location, onLocationChange }: Properties): null => {
	const mapClient = useMapClient();

	useEffect(() => {
		const updateForm = (coords: [number, number]): void => {
			onLocationChange({ coordinates: coords, type: LocationType.POINT });
		};

		const offReady = mapClient.onReady(() => {
			if (location?.coordinates) {
				mapClient.setSelectionMarker({
					coordinates: location.coordinates,
					draggable: true,
					onDragEnd: updateForm,
				});
			} else {
				mapClient.clearSelectionMarker();
			}
		});

		const offClick = mapClient.onClick((coords) => {
			mapClient.setSelectionMarker({
				coordinates: coords,
				draggable: true,
				onDragEnd: updateForm,
			});
			updateForm(coords);
		});

		return (): void => {
			offReady();
			offClick();
			mapClient.clearSelectionMarker();
		};
	}, [mapClient, onLocationChange, location?.coordinates]);

	return null;
};

export { MapLocationLogic };
