import clsx from "clsx";

import styles from "./styles.module.css";

type Properties = {
	color?: "green" | "outline-green" | "outline-red";
	form?: "default" | "upload";
	label: string;
	onClick?: () => void;
	to?: string;
	type?: "button" | "submit";
};

const Button = ({
	color = "green",
	form = "default",
	label,
	onClick,
	to,
	type = "submit",
}: Properties): React.JSX.Element => {
	const styleList = clsx(styles["button"], styles[form], styles[color]);

	if (to) {
		return (
			<a className={styleList} href={to}>
				{label}
			</a>
		);
	}

	return (
		<button className={styleList} onClick={onClick} type={type}>
			{label}
		</button>
	);
};

export { Button };
