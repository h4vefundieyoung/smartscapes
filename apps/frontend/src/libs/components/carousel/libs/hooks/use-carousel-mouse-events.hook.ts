import { useCallback } from "react";

import { CarauselAnimation } from "../enums/carausel-animation.enum.js";
import { carouselConfig } from "../enums/enums.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import {
	type CarouselCallbacks,
	type CarouselReference,
	type CarouselState,
} from "../types/types.js";

type CarouselMouseEventsProperties = {
	callbacks: CarouselCallbacks;
	carouselReference: CarouselReference;
	state: CarouselStateSetters;
};

type CarouselStateSetters = Pick<
	CarouselState,
	| "overdragOffset"
	| "setAnimationClassName"
	| "setDragging"
	| "setOverdragOffset"
	| "setSpringBounce"
>;

const useCarouselMouseEvents = ({
	callbacks,
	carouselReference,
	state,
}: CarouselMouseEventsProperties): {
	handleMouseDown: (event: React.MouseEvent) => void;
	handleMouseMove: (event: React.MouseEvent) => void;
	handleMouseUpOrLeave: () => void;
} => {
	const { startMomentum } = callbacks;
	const {
		overdragOffset,
		setAnimationClassName,
		setDragging,
		setOverdragOffset,
		setSpringBounce,
	} = state;

	const handleMouseDown = useCallback(
		(event: React.MouseEvent): void => {
			const { offsetLeft, scrollLeft } = getCarouselParameters(
				carouselReference.element,
			);

			carouselReference.isAnimating.current = false;
			setSpringBounce(false);
			setAnimationClassName(null);
			setOverdragOffset(0);

			carouselReference.isDragging.current = true;
			carouselReference.startX.current = event.pageX - offsetLeft;
			carouselReference.scrollStart.current = scrollLeft;
			setDragging(true);

			if (carouselReference.momentumID.current) {
				cancelAnimationFrame(carouselReference.momentumID.current);
				carouselReference.momentumID.current = null;
			}
		},
		[
			carouselReference,
			setAnimationClassName,
			setDragging,
			setOverdragOffset,
			setSpringBounce,
		],
	);

	const handleMouseUpOrLeave = useCallback((): void => {
		const { direction } = getCarouselParameters(carouselReference.element);

		carouselReference.isDragging.current = false;
		setDragging(false);

		if (overdragOffset !== 0) {
			const { CSS_ANIMATION_DELAY, SLINGSHOT_ANIMATION_DURATION } =
				carouselConfig;
			setSpringBounce(false);
			setAnimationClassName(null);
			setOverdragOffset(0);

			setTimeout(() => {
				const slingshotClass =
					direction === "left"
						? CarauselAnimation.SLINGSHOT_LEFT
						: CarauselAnimation.SLINGSHOT_RIGHT;
				setAnimationClassName(slingshotClass);
			}, CSS_ANIMATION_DELAY);

			setTimeout(() => {
				setAnimationClassName(null);
			}, SLINGSHOT_ANIMATION_DURATION + CSS_ANIMATION_DELAY);
		} else if (Math.abs(carouselReference.velocity.current) > 0) {
			startMomentum();
		}
	}, [
		overdragOffset,
		startMomentum,
		setAnimationClassName,
		setOverdragOffset,
		setSpringBounce,
		setDragging,
		carouselReference,
	]);

	const handleMouseMove = useCallback(
		(event: React.MouseEvent): void => {
			const { clientWidth, element, maxScroll, offsetLeft } =
				getCarouselParameters(carouselReference.element);

			if (!carouselReference.isDragging.current || !element) {
				return;
			}

			event.preventDefault();

			const x = event.pageX - offsetLeft;
			const walk = x - carouselReference.startX.current;
			const newScrollLeft = carouselReference.scrollStart.current - walk;
			const maxOverdrag = clientWidth * carouselConfig.OVERDRAG_PERCENTAGE;

			if (newScrollLeft < 0) {
				setOverdragOffset(maxOverdrag);

				return;
			}

			if (newScrollLeft > maxScroll) {
				setOverdragOffset(-maxOverdrag);

				return;
			}

			setOverdragOffset(0);
			element.scrollLeft = newScrollLeft;
			carouselReference.velocity.current =
				walk * carouselConfig.DRAG_MULTIPLIER;
		},
		[carouselReference, setOverdragOffset],
	);

	return {
		handleMouseDown,
		handleMouseMove,
		handleMouseUpOrLeave,
	};
};

export { useCarouselMouseEvents };
