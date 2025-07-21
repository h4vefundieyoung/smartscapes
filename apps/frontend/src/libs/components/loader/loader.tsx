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
			<style>
				{`
					.spinner_Wezc {
						transform-origin: center;
						animation: spinner_Oiah .75s step-end infinite;
					}
					@keyframes spinner_Oiah {
						8.3% { transform: rotate(30deg); }
						16.6% { transform: rotate(60deg); }
						25% { transform: rotate(90deg); }
						33.3% { transform: rotate(120deg); }
						41.6% { transform: rotate(150deg); }
						50% { transform: rotate(180deg); }
						58.3% { transform: rotate(210deg); }
						66.6% { transform: rotate(240deg); }
						75% { transform: rotate(270deg); }
						83.3% { transform: rotate(300deg); }
						91.6% { transform: rotate(330deg); }
						100% { transform: rotate(360deg); }
					}
				`}
			</style>
			<g className="spinner_Wezc" fill={color}>
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
