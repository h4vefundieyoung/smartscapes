import React from "react";

import { MapProvider } from "~/libs/components/components.js";

import { RoutesPanel } from "./libs/components/routes-panel/routes-panel.js";
import { mockPOIs } from "./mock-pois.js";
import styles from "./styles.module.css";

const Explore = (): React.JSX.Element => {
	return (
		<main className={styles["main"]}>
			<div className={styles["container"]}>
				<MapProvider markers={mockPOIs}>
					<RoutesPanel />
				</MapProvider>
			</div>
		</main>
	);
};

export { Explore };
