import React from "react";

import { createContext, useEffect, useRef } from "~/libs/hooks/hooks.js";
import {
	MapClient,
	type MapOptions,
	type MarkerOptions,
} from "~/libs/modules/map-client/map-client.js";

import styles from "./styles.module.css";

const MapContext = createContext<MapClient | null>(null);

type Properties = {
	center?: [number, number];
	children?: React.ReactNode;
	markers?: (MarkerOptions & { id: string })[];
};

const MapProvider = ({
	center,
	children,
	markers = [],
}: Properties): React.JSX.Element => {
	const mapClientReference = useRef(new MapClient());
	const containerReference = useRef<HTMLDivElement>(null);
	const initializedReference = useRef(false);

	useEffect(() => {
		const client = mapClientReference.current;
		const container = containerReference.current;

		if (!container || initializedReference.current) {
			return;
		}

		const mapOptions: MapOptions = center ? { center } : {};
		client.init(container, mapOptions);
		initializedReference.current = true;

		return (): void => {
			client.destroy();
			initializedReference.current = false;
		};
	}, [center]);

	useEffect(() => {
		const client = mapClientReference.current;

		if (!initializedReference.current || !client.getMap()) {
			return;
		}

		client.addAllMapControls();
	}, []);

	useEffect(() => {
		const client = mapClientReference.current;

		if (!center) {
			return;
		}

		client.setCenter(center);
	}, [center]);

	useEffect(() => {
		const client = mapClientReference.current;

		if (!initializedReference.current || !client.getMap()) {
			return;
		}

		client.clearAllMarkers();
		client.addMarkers(markers);
	}, [markers]);

	return (
		<MapContext.Provider value={mapClientReference.current}>
			<div className={styles["map-wrapper"]}>
				<div className={styles["map"]} ref={containerReference} />
				<div className={styles["map-overlays"]}>{children}</div>
			</div>
		</MapContext.Provider>
	);
};

export { MapContext, MapProvider };
