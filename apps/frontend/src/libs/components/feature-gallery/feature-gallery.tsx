import { type Slide } from "~/libs/types/types.js";

import { Button } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	handleDelete?: (id: number) => void;
	isEditMode: boolean;
	slides: Slide[];
};

const FeatureGallery = ({
	handleDelete,
	isEditMode,
	slides,
}: Properties): React.JSX.Element => {
	if (slides.length === 0) {
		return <></>;
	}

	const handleClick = (id: number) => (): void => {
		if (handleDelete) {
			handleDelete(id);
		}
	};

	const [firstSlide, ...otherSlides] = slides;

	const renderSlide = (slide: Slide): React.ReactElement => {
		if (slide.type === "image") {
			return (
				<div className={styles["image-wrapper"]}>
					<img
						alt="point of interest"
						className={styles["image"]}
						src={slide.content as string}
					/>
					{isEditMode && slide.id && (
						<div className={styles["delete-button"]}>
							<Button label="Delete image" onClick={handleClick(slide.id)} />
						</div>
					)}
				</div>
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
