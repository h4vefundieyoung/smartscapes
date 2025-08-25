import { ButtonContainer } from "~/libs/components/components.js";

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
	return (
		<li className={styles["route-card"]}>
			<ButtonContainer
				label={onClick ? `Select route: ${name}` : undefined}
				onClick={onClick}
			>
				{imageUrl ? (
					<img alt={name} className={styles["image"]} src={imageUrl} />
				) : (
					<div className={styles["image-placeholder"]} />
				)}
				<div className={styles["data"]}>
					<p className={styles["label"]}>{name}</p>
				</div>
			</ButtonContainer>
		</li>
	);
};

export { RouteCard };
