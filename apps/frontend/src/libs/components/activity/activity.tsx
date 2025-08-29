import { getFormattedLengthString } from "~/libs/helpers/helpers.js";
import { type RouteLine } from "~/libs/types/types.js";

import { MapProvider } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	comment: null | string;
	length: number;
	routeLine: RouteLine;
	title: string;
};

const Activity = ({
	comment,
	length,
	routeLine,
	title,
}: Properties): React.JSX.Element => {
	const lengthFormattedString = getFormattedLengthString(length);

	return (
		<div className={styles["activity"]}>
			<div className={styles["map-wrapper"]}>
				<MapProvider
					isInteractive={false}
					routeLine={routeLine}
					shouldFitToBounds
				/>
			</div>
			<h4 className={styles["activity-title"]}>{title}</h4>
			<span className={styles["activity-distance"]}>
				Length: {lengthFormattedString}
			</span>
			{comment !== null}{" "}
			<span className={styles[".activity-comment"]}>{comment}</span>
		</div>
	);
};

export { Activity };
