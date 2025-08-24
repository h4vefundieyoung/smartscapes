import styles from "./styles.module.css";

type Properties = {
	label: string;
};

const Tag = ({ label }: Properties): React.JSX.Element => (
	<div className={styles["tag"]}>{label}</div>
);

export { Tag };
