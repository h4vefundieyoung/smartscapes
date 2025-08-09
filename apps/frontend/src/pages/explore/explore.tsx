import React from "react";

import { MapProvider } from "~/libs/components/components.js";
import { useMapClient } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

// Dummy component to use useMapClient and silence unused export warning, delete it as soon as possible
const DummyMapClientUser = (): null | undefined => {
	const mapClient = useMapClient();

	mapClient.getMap();

	return null;
};

const Explore = (): React.JSX.Element => {
	return (
		<main className={styles["main"]}>
			<MapProvider>
				<DummyMapClientUser />
			</MapProvider>
		</main>
	);
};

export { Explore };
