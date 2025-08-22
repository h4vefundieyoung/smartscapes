import { type Slide } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	slides: Slide[];
};

const FeatureGallery = ({ slides }: Properties): React.JSX.Element => {
	const slideList = slides.map((slide, index) => {
		if (slide.type === "image") {
			return (
				<img
					alt="point of interest"
					className={styles["image"]}
					key={index}
					src={slide.content as string}
				/>
			);
		}

		return (
			<div className={styles["component"]} key={index}>
				{slide.content}
			</div>
		);
	});

	return <section className={styles["container"]}>{slideList}</section>;
};

export { FeatureGallery };
