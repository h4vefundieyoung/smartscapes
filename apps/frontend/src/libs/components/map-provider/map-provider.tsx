import React, {createContext,} from "react";
import { useContext, useEffect, useRef } from '~/libs/hooks/hooks.js';

import {
	mapClient,
	type MapOptions,
	type MarkerOptions,
} from "~/libs/modules/map-client/map-client.js";

import styles from "./styles.module.css";

const MapContext = createContext<typeof mapClient | null>(null);

type MapProviderProps = {
	center?: [number, number];
	children?: React.ReactNode;
	className?: string;
	markers?: Array<{ id: string } & MarkerOptions>;
	onMarkerClick?: (id: string, coordinates: [number, number]) => void;
};

const MapProvider = ({
	center,
	children,
	className,
	markers = [],
	onMarkerClick,
}: MapProviderProps): React.JSX.Element => {
	const clientRef = useRef<typeof mapClient>(mapClient);
	const containerRef = useRef<HTMLDivElement>(null);
	const initializedRef = useRef<boolean>(false);

	useEffect(() => {
		const client = clientRef.current;
		const container = containerRef.current;

		if (!container || initializedRef.current) return;

		const mapOptions: MapOptions = {};
		if (center !== undefined) mapOptions.center = center;

		client.init(container, mapOptions);
		client.addAllMapControls();
		initializedRef.current = true;

		return () => {
			client.destroy();
			initializedRef.current = false;
		};
	}, []);

	useEffect(() => {
		const client = clientRef.current;

		if (!initializedRef.current || !client.getMap() || !center) return;

		client.flyTo(center);
	}, [center]);

	useEffect(() => {
		const client = clientRef.current;

		if (!client.getMap()) return;

		client.clearAllMarkers();

		client.addMarkers(markers);

		if (onMarkerClick) {
			client.setMarkerClickHandler(onMarkerClick);
		}
	}, [markers, onMarkerClick]);

	return (
		<MapContext.Provider value={clientRef.current}>
			<div className={`${styles["map-wrapper"]} ${className || ""}`}>
				<div className={styles["map"]} ref={containerRef} />
				{children}
			</div>
		</MapContext.Provider>
	);
};

const useMapContext = (): typeof mapClient | null => useContext(MapContext);

export { MapProvider, useMapContext };
