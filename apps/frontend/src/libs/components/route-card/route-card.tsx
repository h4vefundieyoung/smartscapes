import StarIcon from "./star.svg?react";
import styles from "./styles.module.css";

type Properties = {
	alt: string;
	image?: string;
	label: string;
};

const RouteCard = ({ alt, image, label }: Properties): React.JSX.Element => {
	return (
		<div className={styles["route-card"]}>
			{image ? (
				<img alt={alt} className={styles["image"]} src={image} />
			) : (
				<div className={styles["image"]} />
			)}
			<div className={styles["data"]}>
				<p className={styles["label"]}>{label}</p>
				<ul className={styles["description"]}>
					<li>
						<StarIcon className={styles["star"]} />
					</li>
					<li>4.5</li>
					<li>•</li>
					<li>Moderate</li>
					<li>•</li>
					<li>3.9 km</li>
					<li>•</li>
					<li>Est. 52 min</li>
				</ul>
			</div>
		</div>
	);
};

export { RouteCard };
