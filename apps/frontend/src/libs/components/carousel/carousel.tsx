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
	const carouselReference = useCarouselReference();

	const {
		bounceDirection,
		dragging,
		overdragOffset,
		setBounceDirection,
		setDragging,
		setOverdragOffset,
		setSlingshotDirection,
		setSpringBounce,
		slingshotDirection,
		springBounce,
	} = useCarouselState();

	const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
		useCarouselEvents({
			carouselReference,
			state: {
				overdragOffset,
				setBounceDirection,
				setDragging,
				setOverdragOffset,
				setSlingshotDirection,
				setSpringBounce,
			},
		});

	const { carouselClassName, carouselStyle } = useCarouselStyles({
		bounceDirection,
		dragging,
		overdragOffset,
		slingshotDirection,
		springBounce,
	});

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={carouselClassName}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseUpOrLeave}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUpOrLeave}
				ref={carouselReference.carouselReference}
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
