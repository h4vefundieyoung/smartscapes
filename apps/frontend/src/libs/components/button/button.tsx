import { combineClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	label: string;
	onClick?: () => void;
	to?: string;
	type?: "button" | "submit";
	variant?: "outlined" | "primary";
};

const Button = ({
	label,
	onClick,
	to,
	type = "submit",
	variant = "primary",
}: Properties): React.JSX.Element => {
	const buttonClass = combineClassNames(
		styles["button"],
		variant === "outlined" && styles["button-outlined"],
		variant === "primary" && styles["button-primary"],
	);

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
