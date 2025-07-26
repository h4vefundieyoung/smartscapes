import { useCallback, useEffect, useRef, useState } from "react";

import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";

import styles from "./style.module.css";

const MOMENTUM_CONSTANTS = {
	CSS_ANIMATION_DELAY: 10,
	DRAG_MULTIPLIER: 0.15,
	EDGE_THRESHOLD: 1,
	FRICTION: 0.96,
	MIN_VELOCITY: 0.5,
	OVERDRAG_PERCENTAGE: 0.018,
	OVERDRAG_RESET_DELAY: 50,
	SCROLL_SPEED: 0.5,
	SPRING_ANIMATION_DURATION: 200,
	TRANSITION_DELAY: 100,
	WHEEL_MULTIPLIER: 0.05,
} as const;

const SLINGSHOT_ANIMATION_DURATION = 400;

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
	const [springBounce, setSpringBounce] = useState<boolean>(false);
	const [bounceDirection, setBounceDirection] = useState<
		"left" | "right" | null
	>(null);
	const [slingshotDirection, setSlingshotDirection] = useState<
		"left" | "right" | null
	>(null);
	const isAnimating = useRef<boolean>(false);
	const [overdragOffset, setOverdragOffset] = useState<number>(0);

	const checkBoundaries = useCallback(() => {
		if (!carouselReference.current || isAnimating.current) {
			return;
		}

		const element = carouselReference.current;
		const maxScroll = element.scrollWidth - element.clientWidth;

		const isAtLeftEdge =
			element.scrollLeft <= MOMENTUM_CONSTANTS.EDGE_THRESHOLD;
		const isAtRightEdge =
			element.scrollLeft >= maxScroll - MOMENTUM_CONSTANTS.EDGE_THRESHOLD;

		if (isAtLeftEdge || isAtRightEdge) {
			if (isAtLeftEdge) {
				element.scrollLeft = 0;
				setBounceDirection("left");
			} else if (isAtRightEdge) {
				element.scrollLeft = maxScroll;
				setBounceDirection("right");
			}

			isAnimating.current = true;
			setSpringBounce(true);

			setTimeout(() => {
				setSpringBounce(false);
				setBounceDirection(null);
				isAnimating.current = false;
			}, MOMENTUM_CONSTANTS.SPRING_ANIMATION_DURATION);
		}
	}, []);

	const animateMomentum = useCallback(() => {
		if (!carouselReference.current) {
			return;
		}

		const element = carouselReference.current;
		velocity.current *= MOMENTUM_CONSTANTS.FRICTION;

		if (Math.abs(velocity.current) < MOMENTUM_CONSTANTS.MIN_VELOCITY) {
			velocity.current = 0;
			momentumID.current = null;

			checkBoundaries();

			return;
		}

		element.scrollLeft -= velocity.current * MOMENTUM_CONSTANTS.SCROLL_SPEED;

		const maxScroll = element.scrollWidth - element.clientWidth;
		const isAtLeftEdge =
			element.scrollLeft <= MOMENTUM_CONSTANTS.EDGE_THRESHOLD;
		const isAtRightEdge =
			element.scrollLeft >= maxScroll - MOMENTUM_CONSTANTS.EDGE_THRESHOLD;

		if (isAtLeftEdge || isAtRightEdge) {
			checkBoundaries();
			velocity.current = 0;
			momentumID.current = null;

			return;
		}

		momentumID.current = requestAnimationFrame(animateMomentum);
	}, [checkBoundaries]);

	const startMomentum = useCallback(() => {
		if (momentumID.current) {
			cancelAnimationFrame(momentumID.current);
		}

		isAnimating.current = false;
		setSpringBounce(false);

		momentumID.current = requestAnimationFrame(animateMomentum);
	}, [animateMomentum]);

	const handleWheelEvent = useCallback(
		(event: WheelEvent): void => {
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

	useEffect(() => {
		const element = carouselReference.current;

		if (element) {
			element.addEventListener("wheel", handleWheelEvent, { passive: false });

			return (): void => {
				element.removeEventListener("wheel", handleWheelEvent);
			};
		}
	}, [handleWheelEvent]);

	const handleMouseDown = useCallback((event: React.MouseEvent): void => {
		if (!carouselReference.current) {
			return;
		}

		isAnimating.current = false;
		setSpringBounce(false);
		setBounceDirection(null);
		setOverdragOffset(0);

		isDragging.current = true;
		startX.current = event.pageX - carouselReference.current.offsetLeft;
		scrollStart.current = carouselReference.current.scrollLeft;
		setDragging(true);

		if (momentumID.current) {
			cancelAnimationFrame(momentumID.current);
			momentumID.current = null;
		}
	}, []);

	const handleMouseUp = useCallback((): void => {
		isDragging.current = false;
		setDragging(false);

		if (overdragOffset !== 0) {
			setSpringBounce(false);
			setBounceDirection(null);

			setOverdragOffset(0);

			setTimeout(() => {
				if (overdragOffset > 0) {
					setSlingshotDirection("left");
				} else {
					setSlingshotDirection("right");
				}
			}, MOMENTUM_CONSTANTS.CSS_ANIMATION_DELAY);

			setTimeout(() => {
				setSlingshotDirection(null);
			}, SLINGSHOT_ANIMATION_DURATION + MOMENTUM_CONSTANTS.CSS_ANIMATION_DELAY);

			return;
		}

		startMomentum();
	}, [overdragOffset, startMomentum]);

	const handleMouseMove = useCallback((event: React.MouseEvent): void => {
		if (!isDragging.current || !carouselReference.current) {
			return;
		}

		event.preventDefault();
		const x = event.pageX - carouselReference.current.offsetLeft;
		const walk = x - startX.current;
		const newScrollLeft = scrollStart.current - walk;
		const maxScroll =
			carouselReference.current.scrollWidth -
			carouselReference.current.clientWidth;

		const maxOverdrag =
			carouselReference.current.clientWidth *
			MOMENTUM_CONSTANTS.OVERDRAG_PERCENTAGE;

		if (newScrollLeft < 0) {
			setOverdragOffset(maxOverdrag);

			return;
		}

		if (newScrollLeft > maxScroll) {
			setOverdragOffset(-maxOverdrag);

			return;
		}

		setOverdragOffset(0);
		carouselReference.current.scrollLeft = newScrollLeft;
		velocity.current = walk * MOMENTUM_CONSTANTS.DRAG_MULTIPLIER;
	}, []);

	const handleMouseLeave = useCallback((): void => {
		isDragging.current = false;
		setDragging(false);

		if (overdragOffset !== 0) {
			setSpringBounce(false);
			setBounceDirection(null);

			setOverdragOffset(0);

			setTimeout(() => {
				if (overdragOffset > 0) {
					setSlingshotDirection("left");
				} else {
					setSlingshotDirection("right");
				}
			}, MOMENTUM_CONSTANTS.CSS_ANIMATION_DELAY);

			setTimeout(() => {
				setSlingshotDirection(null);
			}, SLINGSHOT_ANIMATION_DURATION + MOMENTUM_CONSTANTS.CSS_ANIMATION_DELAY);
		} else if (Math.abs(velocity.current) > 0) {
			startMomentum();
		}
	}, [overdragOffset, startMomentum]);

	const carouselClassName = combineClassNames(
		styles["carousel"],
		dragging && styles["dragging"],
		springBounce && bounceDirection && styles[`bounce-${bounceDirection}`],
		slingshotDirection && styles[`slingshot-${slingshotDirection}`],
	);

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={carouselClassName}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				ref={carouselReference}
				role="tablist"
				style={
					overdragOffset === 0
						? undefined
						: { transform: `translateX(${String(overdragOffset)}px)` }
				}
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
