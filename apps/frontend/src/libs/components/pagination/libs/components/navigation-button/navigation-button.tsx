import styles from "./styles.module.css";

type Properties = {
	label: string;
	onClick: () => void;
};

const NavigationButton = ({
	label,
	onClick,
}: Properties): React.JSX.Element => {
	return (
		<button className={styles["pagination-button"]} onClick={onClick}>
			{label}
		</button>
	);
};

export { NavigationButton };
