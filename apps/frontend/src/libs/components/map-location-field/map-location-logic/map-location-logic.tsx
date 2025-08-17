import { LocationType, type PointGeometry } from "@smartscapes/shared";
import { type Marker } from "mapbox-gl";

import { useEffect, useMapClient, useRef } from "~/libs/hooks/hooks.js";

type Properties = {
	location: PointGeometry | undefined;
	onLocationChange: (next: PointGeometry) => void;
};

const MapLocationLogic = ({ location, onLocationChange }: Properties): null => {
	const mapClient = useMapClient();
	const markerReference = useRef<Marker | null>(null);

	useEffect((): (() => void) => {
		const updateForm = (coords: [number, number]): void => {
			onLocationChange({ coordinates: coords, type: LocationType.POINT });
		};

		const setOrCreate = (coords: [number, number]): void => {
			if (markerReference.current) {
				markerReference.current.setLngLat(coords);

				return;
			}

			const created = mapClient.addMarker({
				coordinates: coords,
				draggable: true,
				onDragEnd: updateForm,
			});

			if (created) {
				markerReference.current = created;
			}
		};

		const removeMarker = (): void => {
			if (markerReference.current) {
				markerReference.current.remove();
				markerReference.current = null;
			}
		};

		let cleanupReady: () => void = (): void => {};

		if (location?.coordinates) {
			cleanupReady = mapClient.onReady((): void => {
				setOrCreate(location.coordinates);
			});
		} else {
			removeMarker();
		}

		const cleanupClick = mapClient.onClick((coords: [number, number]): void => {
			setOrCreate(coords);
			updateForm(coords);
		});

		return (): void => {
			cleanupReady();
			cleanupClick();
			removeMarker();
		};
	}, [mapClient, onLocationChange, location]);

	return null;
};

export { MapLocationLogic };
