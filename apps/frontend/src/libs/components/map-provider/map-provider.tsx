import {
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { MapClient } from "~/libs/modules/map-client/map-client.js";
import { type Coordinates } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const MapContext = createContext<MapClient | null>(null);

type Properties = {
	children?: React.ReactNode;
	markers?: { coordinates: Coordinates }[];
};

const MapProvider = ({
	children,
	markers = [],
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
		client.addGeolocateControl();
	}, []);

	useEffect(() => {
		const client = mapClientReference.current;

		client.addMarkers(markers);
	}, [markers]);

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
