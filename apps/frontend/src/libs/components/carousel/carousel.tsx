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
		element,
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
			carouselReference: {
				element,
				isAnimating,
				isDragging,
				momentumID,
				scrollStart,
				startX,
				velocity,
			},
			state: {
				overdragOffset,
				setAnimationClassName,
				setDragging,
				setOverdragOffset,
				setSpringBounce,
			},
		});

	const {
		carouselClassName,
		carouselStyle,
		scrollButtonClassName,
		scrollButtonStyle,
	} = useCarouselStyles({
		animationClassName,
		dragging,
		element,
		imagesLength: images.length,
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
				ref={element}
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
			<div className={scrollButtonClassName} style={scrollButtonStyle} />
		</div>
	);
};

export { Carousel };
