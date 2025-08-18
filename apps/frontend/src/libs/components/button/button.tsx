import styles from "./styles.module.css";

type Properties = {
	label: string;
	onClick?: () => void;
	to?: string;
	type?: "button" | "submit";
	variant?: "primary" | "outlined";
};

const Button = ({
	label,
	onClick,
	to,
	type = "submit",
	variant = "primary",
}: Properties): React.JSX.Element => {
	const buttonClass =
		variant === "outlined" ? styles["button-outlined"] : styles["button"];

	if (to) {
		return (
			<a className={buttonClass} href={to}>
				{label}
			</a>
		);
	}

	return (
		<button className={buttonClass} onClick={onClick} type={type}>
			{label}
		</button>
	);
};

export { Button };
