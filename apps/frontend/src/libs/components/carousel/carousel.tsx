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
	const { element, isDragging, momentumID, scrollStart, startX, velocity } =
		useCarouselReference();

	const { dragging, setDragging } = useCarouselState();

	const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
		useCarouselEvents({
			carouselReference: {
				element,
				isDragging,
				momentumID,
				scrollStart,
				startX,
				velocity,
			},
			state: {
				dragging,
				setDragging,
			},
		});

	const { carouselClassName } = useCarouselStyles({
		dragging,
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
