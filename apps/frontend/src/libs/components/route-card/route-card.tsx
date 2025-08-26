import { KeyboardKey } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	imageUrl: null | string;
	name: string;
	onClick?: () => void;
};

const RouteCard = ({
	imageUrl,
	name,
	onClick,
}: Properties): React.JSX.Element => {
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent): void => {
			if (
				onClick &&
				(event.key === KeyboardKey.ENTER || event.key === KeyboardKey.SPACE)
			) {
				event.preventDefault();
				onClick();
			}
		},
		[onClick],
	);

	return (
		<li className={styles["route-card"]}>
			<button
				aria-label={onClick ? `Select route: ${name}` : undefined}
				className={styles["button"]}
				onClick={onClick}
				onKeyDown={handleKeyDown}
			>
				{imageUrl ? (
					<img alt={name} className={styles["image"]} src={imageUrl} />
				) : (
					<div className={styles["image-placeholder"]} />
				)}
				<div className={styles["data"]}>
					<p className={styles["label"]}>{name}</p>
				</div>
			</button>
		</li>
	);
};

export { RouteCard };
