import { type MouseEvent, useCallback } from "react";

import { Icon } from "~/libs/components/icon/icon.js";

import styles from "./styles.module.css";

type Properties = {
	onAppearanceToggle: () => void;
	type: "password" | "text";
};

const ToggleVisionButton = ({
	onAppearanceToggle,
	type,
}: Properties): React.JSX.Element => {
	const typeStateToPasswordIcon: "eye" | "eyeOff" =
		type === "text" ? "eyeOff" : "eye";

	const handleClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			onAppearanceToggle();
		},
		[onAppearanceToggle],
	);

	return (
		<button
			className={styles["password-toggle-button"]}
			onMouseDown={handleClick}
			type="button"
		>
			<span className="visually-hidden">toggle password appearance</span>
			<Icon
				className={styles["password-toggle-button-icon"] || ""}
				height={24}
				name={typeStateToPasswordIcon}
				width={24}
			/>
		</button>
	);
};

export { ToggleVisionButton };
