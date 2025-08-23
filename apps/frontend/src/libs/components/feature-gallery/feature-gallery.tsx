import { type Slide } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	slides: Slide[];
};

const FeatureGallery = ({ slides }: Properties): React.JSX.Element => {
	if (slides.length === 0) {
		return <></>;
	}

	const [firstSlide, ...otherSlides] = slides;

	const renderSlide = (slide: Slide): React.ReactElement => {
		if (slide.type === "image") {
			return (
				<img
					alt="point of interest"
					className={styles["image"]}
					src={slide.content as string}
				/>
			);
		}

		return <div className={styles["component"]}>{slide.content}</div>;
	};

	return (
		<section className={styles["container"]}>
			<div className={styles["left"]}>
				{firstSlide && renderSlide(firstSlide)}
			</div>
			<div className={styles["right"]}>
				{otherSlides.map((slide) => renderSlide(slide))}
			</div>
		</section>
	);
};

export { FeatureGallery };
