import { combineClassNames } from "~/libs/helpers/helpers.js";

import styles from "../../styles.module.css";

const selectIconLeftStylesConfig = {
	control: (): string =>
		combineClassNames(styles["control"], styles["control-icon-left"]),
	loadingIndicator: (): string =>
		styles["loading-indicator-icon-left"] as string,
};

export { selectIconLeftStylesConfig };
