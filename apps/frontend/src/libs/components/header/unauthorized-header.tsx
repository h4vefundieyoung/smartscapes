import { type JSX } from "react";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Button } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	actions: {
		label: string;
		to: ValueOf<typeof AppRoute>;
	}[];
};

const UnautharizedHeader = ({ actions }: Properties): JSX.Element => {
	return (
		<div className={styles["buttons"]}>
			{actions.map(({ label, to }) => (
				<Button key={to} label={label} to={to} type="button" />
			))}
		</div>
	);
};

export { UnautharizedHeader };
