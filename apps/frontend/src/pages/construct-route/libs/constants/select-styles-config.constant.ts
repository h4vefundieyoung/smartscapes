import styles from "../components/side-panel/styles.module.css";

const selectStylesConfig = {
	control: (): string => styles["select-control"] as string,
	loadingIndicator: (): string => styles["select-loading-indicator"] as string,
};

export { selectStylesConfig };
