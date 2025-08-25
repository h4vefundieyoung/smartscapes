import React, { useCallback } from "react";

import { IconButton } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { type RouteGetByIdResponseDto } from "~/modules/explore/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	route: RouteGetByIdResponseDto;
};

const RouteMapPopup = ({ route }: Properties): React.JSX.Element => {
	const handleViewPoisDetails = useCallback((): void => {
		const [firstPoi] = route.pois;

		if (firstPoi) {
			const poisDetailPath = AppRoute.POINTS_OF_INTEREST_$ID.replace(
				":id",
				String(firstPoi.id),
			);

			globalThis.location.href = poisDetailPath;
		}
	}, [route.pois]);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>{route.name}</h3>
			<IconButton
				className={styles["linkButton"]}
				icon="link"
				label="View POIs Details"
				onClick={handleViewPoisDetails}
				size={16}
			/>
		</div>
	);
};

export { RouteMapPopup };
