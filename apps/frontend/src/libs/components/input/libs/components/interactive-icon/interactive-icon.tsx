import { type MouseEvent } from "react";

import { Icon } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	label?: string;
	name: IconName;
	onClick?: () => void;
};

const InteractiveIcon = ({
	label = "input icon-button",
	name,
	onClick,
}: Properties): React.JSX.Element => {
	const handleIconClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			onClick?.();
		},
		[onClick],
	);

	return (
		<button
			className={styles["interactive-icon"]}
			onMouseDown={handleIconClick}
			type="button"
		>
			<span className="visually-hidden">{label}</span>
			<Icon height={24} name={name} width={24} />
		</button>
	);
};

export { InteractiveIcon };
