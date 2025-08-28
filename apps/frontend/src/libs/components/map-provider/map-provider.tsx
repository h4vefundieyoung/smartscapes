import {
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { MapClient } from "~/libs/modules/map-client/map-client.js";
import { type Coordinates, type RouteLine } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const MapContext = createContext<MapClient | null>(null);

type Properties = {
	center?: Coordinates;
	children?: React.ReactNode;
	markers?: { coordinates: Coordinates }[];
	routeLine?: null | RouteLine;
};

const MapProvider = ({
	center,
	children,
	markers = [],
	routeLine,
}: Properties): React.JSX.Element => {
	const mapClientReference = useRef(new MapClient());
	const containerReference = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const handleMapLoad = useCallback(() => {
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		const client = mapClientReference.current;
		const container = containerReference.current;

		if (!container) {
			return;
		}

		client.init(container, { onLoad: handleMapLoad });

		return (): void => {
			setIsLoaded(false);
			client.destroy();
		};
	}, [handleMapLoad]);

	useEffect(() => {
		const client = mapClientReference.current;
		client.addNavigationControl();
		client.addScaleControl();

		if (!center && !routeLine) {
			client.addGeolocateControl();
		}
	}, [center, routeLine]);

	useEffect(() => {
		const client = mapClientReference.current;

		client.addMarkers(markers);
	}, [markers]);

	useEffect(() => {
		if (!isLoaded || !center) {
			return;
		}

		mapClientReference.current.flyTo(center);
	}, [isLoaded, center]);

	useEffect(() => {
		if (!isLoaded || !routeLine) {
			return;
		}

		const client = mapClientReference.current;

		client.renderRoute(routeLine);

		const coordinates = routeLine.geometry.coordinates as
			| Coordinates[]
			| undefined;

		if (coordinates && coordinates.length > 0) {
			client.fitToCoordinates(coordinates);
		}
	}, [isLoaded, routeLine]);

	return (
		<MapContext.Provider value={mapClientReference.current}>
			<div className={styles["map-wrapper"]}>
				<div className={styles["map"]} ref={containerReference} />
				{isLoaded && <div className={styles["map-overlays"]}>{children}</div>}
			</div>
		</MapContext.Provider>
	);
};

export { MapContext, MapProvider };
