import { Fragment } from "react";

import { type Slide } from "~/libs/types/types.js";

import { Button } from "../components.js";
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
		return (
			<div className={styles["image-wrapper"]}>
				{slide.content}
				{slide.onDelete && (
					<div className={styles["delete-button"]}>
						<Button label="Delete image" onClick={slide.onDelete} />
					</div>
				)}
			</div>
		);
	};

	return (
		<section className={styles["container"]}>
			<div className={styles["left"]}>
				{firstSlide && renderSlide(firstSlide)}
			</div>
			<div className={styles["right"]}>
				{otherSlides.map((slide, index) => (
					<Fragment key={index}>{renderSlide(slide)}</Fragment>
				))}
			</div>
		</section>
	);
};

export { FeatureGallery };
