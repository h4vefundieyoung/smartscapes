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
	location?: PointGeometry;
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

	const handleSetMarker = useCallback(
		(coordinates: PointGeometry["coordinates"]) => {
			if (markerReference.current) {
				markerReference.current.setCoordinates(coordinates);

				return;
			}

			markerReference.current = mapClient.addMarker({
				coordinates,
				isDraggable: true,
				onDragEnd: handleMarkerDragEnd,
			});
		},
		[mapClient, handleMarkerDragEnd],
	);

	useEffect(() => {
		const unsubscribe = mapClient.addMapClickListener((coordinates) => {
			handleSetMarker(coordinates);
			onLocationChange({ coordinates, type: LocationType.POINT });
		});

		return (): void => {
			unsubscribe();
		};
	}, [mapClient, handleSetMarker, onLocationChange]);

	useEffect(() => {
		if (!location && markerReference.current) {
			markerReference.current.remove();
			markerReference.current = null;

			return;
		}

		if (!location) {
			return;
		}

		handleSetMarker(location.coordinates);
	}, [location, handleSetMarker]);

	return null;
};

export { MapLocationLogic };
