import { useCallback } from "react";

import { CarauselConfig } from "../enums/enums.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import {
	type CarouselDirection,
	type CarouselReference,
} from "../types/types.js";

type CarouselMouseEventsProperties = {
	callbacks: {
		checkBoundaries: () => void;
		startMomentum: () => void;
	};
	carouselReference: CarouselReference;
	state: {
		overdragOffset: number;
		setBounceDirection: (direction: CarouselDirection) => void;
		setDragging: (value: boolean) => void;
		setOverdragOffset: (value: number) => void;
		setSlingshotDirection: (direction: CarouselDirection) => void;
		setSpringBounce: (value: boolean) => void;
	};
};

const useCarouselMouseEvents = ({
	callbacks,
	carouselReference,
	state,
}: CarouselMouseEventsProperties): {
	handleMouseDown: (event: React.MouseEvent) => void;
	handleMouseMove: (event: React.MouseEvent) => void;
	handleMouseUpOrLeave: () => void;
} => {
	const {
		overdragOffset,
		setBounceDirection,
		setDragging,
		setOverdragOffset,
		setSlingshotDirection,
		setSpringBounce,
	} = state;
	const { startMomentum } = callbacks;

	const handleMouseDown = useCallback(
		(event: React.MouseEvent): void => {
			const { offsetLeft, scrollLeft } = getCarouselParameters({
				carouselReference: carouselReference.carouselReference,
			});

			carouselReference.isAnimating.current = false;
			setSpringBounce(false);
			setBounceDirection(null);
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
			setBounceDirection,
			setDragging,
			setOverdragOffset,
			setSpringBounce,
		],
	);

	const handleMouseUpOrLeave = useCallback((): void => {
		const { bounceDirection } = getCarouselParameters({
			carouselReference: carouselReference.carouselReference,
		});

		carouselReference.isDragging.current = false;
		setDragging(false);

		if (overdragOffset !== 0) {
			const { CSS_ANIMATION_DELAY, SLINGSHOT_ANIMATION_DURATION } =
				CarauselConfig;
			setSpringBounce(false);
			setBounceDirection(null);
			setOverdragOffset(0);

			setTimeout(() => {
				setSlingshotDirection(bounceDirection);
			}, CSS_ANIMATION_DELAY);

			setTimeout(() => {
				setSlingshotDirection(null);
			}, SLINGSHOT_ANIMATION_DURATION + CSS_ANIMATION_DELAY);
		} else if (Math.abs(carouselReference.velocity.current) > 0) {
			startMomentum();
		}
	}, [
		overdragOffset,
		startMomentum,
		setBounceDirection,
		setOverdragOffset,
		setSlingshotDirection,
		setSpringBounce,
		setDragging,
		carouselReference,
	]);

	const handleMouseMove = useCallback(
		(event: React.MouseEvent): void => {
			const { clientWidth, element, maxScroll, offsetLeft } =
				getCarouselParameters({
					carouselReference: carouselReference.carouselReference,
				});

			if (!carouselReference.isDragging.current || !element) {
				return;
			}

			event.preventDefault();

			const x = event.pageX - offsetLeft;
			const walk = x - carouselReference.startX.current;
			const newScrollLeft = carouselReference.scrollStart.current - walk;
			const maxOverdrag = clientWidth * CarauselConfig.OVERDRAG_PERCENTAGE;

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
				walk * CarauselConfig.DRAG_MULTIPLIER;
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
