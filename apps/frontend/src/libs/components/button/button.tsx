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
	variant?: "ghost" | "outlined" | "outlined-danger" | "primary" | "secondary";
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
	const isGhostVariant = variant === "ghost";
	const buttonClass = combineClassNames(
		styles["button"],
		variant === "outlined" && styles["button-outlined"],
		variant === "outlined-danger" && styles["outlined-danger"],
		variant === "primary" && styles["button-primary"],
		variant === "secondary" && styles["button-secondary"],
		isGhostVariant && styles["button-ghost"],
	);

	const buttonContent = useMemo(
		() => (
			<>
				<span className={icon && "visually-hidden"}>{label}</span>
				{icon && (
					<span
						className={isGhostVariant ? styles["icon-pressed"] : styles["icon"]}
					>
						<Icon height={20} name={icon} width={20} />
					</span>
				)}
			</>
		),
		[icon, label, isGhostVariant],
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
			{label}
		</button>
	);
};

export { Button };
