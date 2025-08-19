import { LocationType } from "~/libs/enums/enums.js";
import {
	useCallback,
	useEffect,
	useMapClient,
	useRef,
} from "~/libs/hooks/hooks.js";
import { type MapMarker } from "~/libs/modules/map-client/libs/types/map-marker.type.js";
import { type PointGeometry } from "~/libs/types/types.js";

type Properties = {
	location: PointGeometry | undefined;
	onLocationChange: (next: PointGeometry) => void;
};

const MapLocationLogic = ({ location, onLocationChange }: Properties): null => {
	const mapClient = useMapClient();
	const markerReference = useRef<MapMarker | null>(null);

	const handleMarkerDragEnd = useCallback(
		(coordinates: PointGeometry["coordinates"]) => {
			onLocationChange({ coordinates, type: LocationType.POINT });
		},
		[onLocationChange],
	);

	const handleAddMarker = useCallback(
		(coordinates: PointGeometry["coordinates"]) => {
			markerReference.current = mapClient.addMarker({
				coordinates,
				isDraggable: true,
				onDragEnd: handleMarkerDragEnd,
			});
		},
		[mapClient, handleMarkerDragEnd],
	);

	useEffect(() => {
		if (markerReference.current || location) {
			return;
		}

		const unsubscribe = mapClient.addMapClickListener((coordinates) => {
			if (!markerReference.current) {
				onLocationChange({ coordinates, type: LocationType.POINT });
				unsubscribe();
			}
		});

		return (): void => {
			unsubscribe();
		};
	}, [mapClient, handleAddMarker, onLocationChange, location]);

	useEffect(() => {
		if (!location && markerReference.current) {
			markerReference.current.remove();
			markerReference.current = null;

			return;
		}

		if (!location) {
			return;
		}

		if (markerReference.current) {
			markerReference.current.setCoordinates(location.coordinates);
		} else {
			handleAddMarker(location.coordinates);
		}
	}, [location, handleAddMarker]);

	return null;
};

export { MapLocationLogic };
