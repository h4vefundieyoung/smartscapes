import React from "react";

import { MapProvider } from "~/libs/components/components.js";
import { useMapClient } from "~/libs/hooks/hooks.js";

import { RoutesPanel } from "./libs/components/routes-panel/routes-panel.js";
import { mockPOIs } from "./mock-pois.js";
import styles from "./styles.module.css";

const DummyMapClientUser = (): null => {
	const mapClient = useMapClient();

	mapClient.resize();

	return null;
};

const Explore = (): React.JSX.Element => {
	return (
		<main className={styles["main"]}>
			<div className={styles["routes-container"]}>
				<RoutesPanel />
			</div>
			<div className={styles["container"]}>
				<MapProvider markers={mockPOIs}>
					<DummyMapClientUser />
				</MapProvider>
			</div>
		</main>
	);
};

export { Explore };
