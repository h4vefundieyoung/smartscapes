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
			</div>
		</div>
	);
};

export { RouteCard };
