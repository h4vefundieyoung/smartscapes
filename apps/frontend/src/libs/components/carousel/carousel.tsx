import {
	useCarouselEvents,
	useCarouselReference,
	useCarouselState,
	useCarouselStyles,
} from "./libs/hooks/hooks.js";
import styles from "./style.module.css";

type Properties = {
	images: string[];
};

const Carousel = ({ images }: Properties): React.JSX.Element => {
	const {
		carouselReference,
		isAnimating,
		isDragging,
		momentumID,
		scrollStart,
		startX,
		velocity,
	} = useCarouselReference();

	const {
		animationClassName,
		dragging,
		overdragOffset,
		setAnimationClassName,
		setDragging,
		setOverdragOffset,
		setSpringBounce,
	} = useCarouselState();

	const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
		useCarouselEvents({
			carouselElement: carouselReference,
			isAnimating,
			isDragging,
			momentumID,
			overdragOffset,
			scrollStart,
			setAnimationClassName,
			setDragging,
			setOverdragOffset,
			setSpringBounce,
			startX,
			velocity,
		});

	const { carouselClassName, carouselStyle } = useCarouselStyles({
		animationClassName,
		dragging,
		overdragOffset,
	});

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={carouselClassName}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseUpOrLeave}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUpOrLeave}
				ref={carouselReference}
				role="tablist"
				style={carouselStyle}
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
export { mockImages } from "./mock-images.js";
