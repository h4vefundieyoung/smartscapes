import styles from "./styles.module.css";

type Properties = {
	disabled?: boolean;
	label: string;
	onClick: () => void;
};

const NavigationButton = ({
	disabled = false,
	label,
	onClick,
}: Properties): React.JSX.Element => {
	return (
		<button
			className={styles["pagination-button"]}
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export { NavigationButton };
