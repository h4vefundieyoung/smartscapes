import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";

import styles from "./styles.module.css";

const ImageGallery = (): React.JSX.Element => {
	return (
		<section className={styles["container"]}>
			<img
				alt="Main point of interest of the route"
				className={styles["image"]}
				src={image1}
			/>

			<img
				alt="Secondary point of interest of the route"
				className={styles["image"]}
				src={image2}
			/>
			<img
				alt="Secondary point of interest of the route"
				className={styles["image"]}
				src={image3}
			/>
		</section>
	);
};

export { ImageGallery };
