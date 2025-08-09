import image1 from "./assets/1.png";
import image2 from "./assets/2.png";
import image3 from "./assets/3.png";
import styles from "./styles.module.css";

type Properties = {
	description: string;
};

const ImagesSection = ({ description }: Properties): React.JSX.Element => {
	return (
		<section className={styles["container"]}>
			<div className={styles["primary-description-wrapper"]}>
				<img alt="" className={styles["primary-image"]} src={image1} />
				<p className={styles["description"]}>{description}</p>
			</div>

			<div className={styles["secondary-images-wrapper"]}>
				<img alt="" className={styles["secondary-image"]} src={image2} />
				<img alt="" className={styles["secondary-image"]} src={image3} />
			</div>
		</section>
	);
};

export { ImagesSection };
