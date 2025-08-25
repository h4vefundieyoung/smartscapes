import { Icon } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	disabled?: boolean;
	icon?: IconName;
	label: string;
	onClick?: () => void;
	pressed?: boolean;
	to?: string;
	type?: "button" | "submit";
	variant?: "outlined" | "outlined-danger" | "primary" | "secondary";
};

const Button = ({
	disabled = false,
	icon,
	label,
	onClick,
	pressed,
	to,
	type = "submit",
	variant = "primary",
}: Properties): React.JSX.Element => {
	const buttonClass = combineClassNames(
		styles["button"],
		variant === "outlined" && styles["button-outlined"],
		variant === "outlined-danger" && styles["outlined-danger"],
		variant === "primary" && styles["button-primary"],
		variant === "secondary" && styles["button-secondary"],
		pressed && styles["button-pressed"],
	);

	const buttonContent = useMemo(
		() => (
			<>
				<span className={icon && "visually-hidden"}>{label}</span>
				{icon && (
					<span className={pressed ? styles["icon-pressed"] : styles["icon"]}>
						<Icon height={20} name={icon} width={20} />
					</span>
				)}
			</>
		),
		[icon, pressed, label],
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
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{buttonContent}
		</button>
	);
};

export { Button };
