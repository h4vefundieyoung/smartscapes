import styles from "./button.module.css";

type Properties = {
	label: string;
	onClick?: () => void;
	type?: "button" | "submit";
};

const Button = ({
	label,
	onClick,
	type = "submit",
}: Properties): React.JSX.Element => {
	return (
		<button className={styles["common-button"]} onClick={onClick} type={type}>
			{label}
		</button>
	);
};

export { Button };
