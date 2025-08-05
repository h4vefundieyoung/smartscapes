import {
	useCarouselMomentum,
	useCarouselReference,
	useCarouselWheelEvent,
	useMouseLeave,
} from "./libs/hooks/hooks.js";
import styles from "./style.module.css";

type Properties = {
	images: string[];
};

const Carousel = ({ images }: Properties): React.JSX.Element => {
	const carouselReference = useCarouselReference();
	const { startMomentum } = useCarouselMomentum(carouselReference);
	const { handleMouseLeave } = useMouseLeave(carouselReference, startMomentum);

	useCarouselWheelEvent(carouselReference, startMomentum);

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={styles["carousel"]}
				onMouseLeave={handleMouseLeave}
				ref={carouselReference.element}
				role="tablist"
				tabIndex={0}
			>
				{images.map((image) => (
					<div className={styles["carousel-item"]} key={image}>
						<img alt="carousel" draggable={false} src={image} />
					</div>
				))}
			</div>
		</div>
	);
};

export { Carousel };
