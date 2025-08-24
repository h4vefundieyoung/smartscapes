import { type MouseEvent } from "react";

import { Icon } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	label: string | undefined;
	name: IconName;
	onClick: (() => void) | undefined;
	state: "default" | "error";
};

const InputIcon = ({
	label,
	name,
	onClick,
	state,
}: Properties): React.JSX.Element => {
	const isStaticIcon = !onClick;

	const handleIconClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			onClick?.();
		},
		[onClick],
	);

	if (isStaticIcon) {
		return (
			<span
				className={combineClassNames(
					styles["icon"],
					state === "error" && styles["icon-error"],
				)}
			>
				<Icon height={24} name={name} width={24} />
			</span>
		);
	}

	return (
		<button
			className={combineClassNames(
				styles["icon"],
				styles["icon-button"],
				state === "error" && styles["icon-error"],
			)}
			onMouseDown={handleIconClick}
			type="button"
		>
			<span className="visually-hidden">{label}</span>
			<Icon height={24} name={name} width={24} />
		</button>
	);
};

export { InputIcon };
