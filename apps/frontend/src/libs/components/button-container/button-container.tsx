import { type ReactNode } from "react";

import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	label?: string | undefined;
	onClick?: (() => void) | undefined;
};

const ButtonContainer = ({
	children,
	label,
	onClick,
}: Properties): React.JSX.Element => {
	const handleClick = useCallback((): void => {
		if (onClick) {
			onClick();
		}
	}, [onClick]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent): void => {
			if (onClick && (event.key === "Enter" || event.key === " ")) {
				event.preventDefault();
				onClick();
			}
		},
		[onClick],
	);

	if (!onClick) {
		return <div>{children}</div>;
	}

	return (
		<button
			aria-label={label ?? ""}
			className={styles["button"] ?? ""}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			type="button"
		>
			{children}
		</button>
	);
};

export { ButtonContainer };
