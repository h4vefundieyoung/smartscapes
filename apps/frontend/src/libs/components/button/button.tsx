import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	label: string;
	onClick?: () => void;
	to?: string;
	type?: "button" | "submit";
};

const Button = ({
	className,
	label,
	onClick,
	to,
	type = "submit",
}: Properties): React.JSX.Element => {
	const buttonClassName = combineClassNames(styles["button"], className);

	if (to) {
		return (
			<a className={buttonClassName} href={to}>
				{label}
			</a>
		);
	}

	return (
		<button className={buttonClassName} onClick={onClick} type={type}>
			{label}
		</button>
	);
};

export { Button };
