import { Icon } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	icon?: IconName;
	isDisabled?: boolean;
	label: string;
	onClick?: () => void;
	to?: string;
	type?: "button" | "submit";
	variant?: "outlined" | "outlined-danger" | "primary";
};

const Button = ({
	icon,
	isDisabled = false,
	label,
	onClick,
	to,
	type = "submit",
	variant = "primary",
}: Properties): React.JSX.Element => {
	const buttonClass = combineClassNames(
		styles["button"],
		icon && styles["button-icon"],
		variant === "outlined" && styles["button-outlined"],
		variant === "outlined-danger" && styles["button-outlined-danger"],
		variant === "primary" && styles["button-primary"],
	);

	const buttonContent = useMemo(
		() => (
			<>
				<span className={icon && "visually-hidden"}>{label}</span>
				{icon && <Icon height={24} name={icon} width={24} />}
			</>
		),
		[icon, label],
	);

	if (to) {
		return (
			<a className={buttonClass} href={to}>
				{buttonContent}
			</a>
		);
	}

	return (
		<button
			className={buttonClass}
			disabled={isDisabled}
			onClick={onClick}
			type={type}
		>
			{buttonContent}
		</button>
	);
};

export { Button };
