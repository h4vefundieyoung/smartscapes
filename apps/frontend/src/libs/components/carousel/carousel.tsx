import { useCallback, useRef, useState } from "react";

import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";

import styles from "./style.module.css";

const MOMENTUM_CONSTANTS = {
	DRAG_MULTIPLIER: 0.15,
	FRICTION: 0.96,
	MIN_VELOCITY: 0.5,
	SCROLL_SPEED: 0.5,
	WHEEL_MULTIPLIER: 0.05,
} as const;

type Properties = {
	images: string[];
};

const Carousel = ({ images }: Properties): React.JSX.Element => {
	const carouselReference = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollStart = useRef(0);
	const velocity = useRef(0);
	const momentumID = useRef<null | number>(null);
	const [dragging, setDragging] = useState<boolean>(false);

	const animateMomentum = useCallback(() => {
		if (!carouselReference.current) {
			return;
		}

		const element = carouselReference.current;
		velocity.current *= MOMENTUM_CONSTANTS.FRICTION;

		if (Math.abs(velocity.current) < MOMENTUM_CONSTANTS.MIN_VELOCITY) {
			velocity.current = 0;
			momentumID.current = null;

			return;
		}

		element.scrollLeft -= velocity.current * MOMENTUM_CONSTANTS.SCROLL_SPEED;

		momentumID.current = requestAnimationFrame(animateMomentum);
	}, []);

	const startMomentum = useCallback(() => {
		if (momentumID.current) {
			cancelAnimationFrame(momentumID.current);
		}

		momentumID.current = requestAnimationFrame(animateMomentum);
	}, [animateMomentum]);

	const handleWheel = useCallback(
		(event: React.WheelEvent): void => {
			event.preventDefault();

			if (carouselReference.current) {
				velocity.current += event.deltaY * MOMENTUM_CONSTANTS.WHEEL_MULTIPLIER;

				if (!momentumID.current) {
					startMomentum();
				}
			}
		},
		[startMomentum],
	);

	const handleMouseDown = useCallback((event: React.MouseEvent): void => {
		if (!carouselReference.current) {
			return;
		}

		isDragging.current = true;
		startX.current = event.pageX - carouselReference.current.offsetLeft;
		scrollStart.current = carouselReference.current.scrollLeft;
		setDragging(true);

		if (momentumID.current) {
			cancelAnimationFrame(momentumID.current);
			momentumID.current = null;
		}
	}, []);

	const handleMouseMove = useCallback((event: React.MouseEvent): void => {
		if (!isDragging.current || !carouselReference.current) {
			return;
		}

		event.preventDefault();
		const x = event.pageX - carouselReference.current.offsetLeft;
		const walk = x - startX.current;
		carouselReference.current.scrollLeft = scrollStart.current - walk;

		velocity.current = walk * MOMENTUM_CONSTANTS.DRAG_MULTIPLIER;
	}, []);

	const handleMouseUp = useCallback((): void => {
		isDragging.current = false;
		setDragging(false);
		startMomentum();
	}, [startMomentum]);

	const handleMouseLeave = useCallback((): void => {
		isDragging.current = false;
		setDragging(false);
		startMomentum();
	}, [startMomentum]);

	const carouselClassName = combineClassNames(
		styles["carousel"],
		dragging && styles["dragging"],
	);

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={carouselClassName}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onWheel={handleWheel}
				ref={carouselReference}
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
export { mockImages } from "./mock-images.js";
