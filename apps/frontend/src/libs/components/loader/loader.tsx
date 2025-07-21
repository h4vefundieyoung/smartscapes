import { type FC } from "react";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	color?: string;
	size?: number;
};

const AVERAGE_LOADER_SIZE = 32; // px

const Loader: FC<Properties> = ({
	className,
	color = "black",
	size = AVERAGE_LOADER_SIZE,
}) => {
	return (
		<svg
			className={[styles["loader"], className].filter(Boolean).join(" ")}
			data-test-id="loader"
			height={size}
			viewBox="0 0 24 24"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g className={styles["spinner"]} fill={color}>
				<circle cx="12" cy="2.5" opacity=".14" r="1.5" />
				<circle cx="16.75" cy="3.77" opacity=".29" r="1.5" />
				<circle cx="20.23" cy="7.25" opacity=".43" r="1.5" />
				<circle cx="21.50" cy="12.00" opacity=".57" r="1.5" />
				<circle cx="20.23" cy="16.75" opacity=".71" r="1.5" />
				<circle cx="16.75" cy="20.23" opacity=".86" r="1.5" />
				<circle cx="12" cy="21.5" r="1.5" />
			</g>
		</svg>
	);
};

export { Loader };
