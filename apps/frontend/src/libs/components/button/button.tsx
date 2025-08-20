import clsx from "clsx";

import styles from "./styles.module.css";

type Properties = {
	btnColor?: "green" | "outline-green" | "outline-red";
	btnType?: "filled" | "outlined";
	label: string;
	onClick?: () => void;
	to?: string;
	type?: "button" | "submit";
};

const Button = ({
	btnColor: buttonColor = "green",
	btnType: buttonType = "filled",
	label,
	onClick,
	to,
	type = "submit",
}: Properties): React.JSX.Element => {
	const style = clsx(styles["button"], styles[buttonColor], styles[buttonType]);

	if (to) {
		return (
			<a className={style} href={to}>
				{label}
			</a>
		);
	}

	return (
		<button className={style} onClick={onClick} type={type}>
			{label}
		</button>
	);
};

export { Button };
