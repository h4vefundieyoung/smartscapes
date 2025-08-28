import { Icon, Link } from "~/libs/components/components.js";
import { AppRoute, KeyboardKey } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	id?: number;
	imageUrl: null | string;
	name: string;
	onClick?: () => void;
};

const RouteCard = ({
	id,
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
			<div className={styles["container"]}>
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
						{id && (
							<Link
								className={styles["linkButton"]}
								to={configureString(AppRoute.ROUTES_$ID, {
									id: id.toString(),
								})}
							>
								<Icon height={16} name="link" width={16} />
							</Link>
						)}
					</div>
				</button>
			</div>
		</li>
	);
};

export { RouteCard };
