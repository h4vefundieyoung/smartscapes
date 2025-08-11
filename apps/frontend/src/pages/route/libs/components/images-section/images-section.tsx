import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";

import styles from "./styles.module.css";

type Properties = {
	description: string;
};

const ImagesSection = ({ description }: Properties): React.JSX.Element => {
	return (
		<section className={styles["container"]}>
			<div className={styles["primary-description-wrapper"]}>
				<img
					alt="Main point of interest of the route"
					className={styles["primary-image"]}
					src={image1}
				/>
				<p className={styles["description"]}>{description}</p>
			</div>

			<div className={styles["secondary-images-wrapper"]}>
				<img
					alt="Secondary point of interest of the route"
					className={styles["secondary-image"]}
					src={image2}
				/>
				<img
					alt="Secondary point of interest of the route"
					className={styles["secondary-image"]}
					src={image3}
				/>
			</div>
		</section>
	);
};

export { ImagesSection };
