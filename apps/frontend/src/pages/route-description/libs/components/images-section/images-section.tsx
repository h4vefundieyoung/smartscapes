import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";

import styles from "./styles.module.css";

const ImagesSection = (): React.JSX.Element => {
	return (
		<section className={styles["container"]}>
			<div className={styles["primary-wrapper"]}>
				<img
					alt="Main point of interest of the route"
					className={styles["primary-image"]}
					src={image1}
				/>
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
