import { useCallback } from "react";

import { CAROUSEL_CONFIG } from "../constants/constants.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import {
	type CarouselCallbacks,
	type CarouselReference,
	type CarouselState,
} from "../types/types.js";

type CarouselMouseEventsProperties = {
	callbacks: CarouselCallbacks;
	carouselReference: CarouselReference;
	state: CarouselState;
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
	const { startMomentum } = callbacks;
	const { setDragging } = state;

	const handleMouseDown = useCallback(
		(event: React.MouseEvent): void => {
			const { offsetLeft, scrollLeft } = getCarouselParameters(
				carouselReference.element,
			);

			carouselReference.isDragging.current = true;
			carouselReference.startX.current = event.pageX - offsetLeft;
			carouselReference.scrollStart.current = scrollLeft;
			setDragging(true);

			if (carouselReference.momentumID.current) {
				cancelAnimationFrame(carouselReference.momentumID.current);
				carouselReference.momentumID.current = null;
			}
		},
		[carouselReference, setDragging],
	);

	const handleMouseUpOrLeave = useCallback((): void => {
		carouselReference.isDragging.current = false;
		setDragging(false);

		if (Math.abs(carouselReference.velocity.current) > 0) {
			startMomentum();
		}
	}, [startMomentum, setDragging, carouselReference]);

	const handleMouseMove = useCallback(
		(event: React.MouseEvent): void => {
			const { element, offsetLeft } = getCarouselParameters(
				carouselReference.element,
			);

			if (!carouselReference.isDragging.current || !element) {
				return;
			}

			event.preventDefault();

			const x = event.pageX - offsetLeft;
			const walk = x - carouselReference.startX.current;
			const newScrollLeft = carouselReference.scrollStart.current - walk;

			element.scrollLeft = newScrollLeft;
			carouselReference.velocity.current =
				walk * CAROUSEL_CONFIG.DRAG_MULTIPLIER;
		},
		[carouselReference],
	);

	return {
		handleMouseDown,
		handleMouseMove,
		handleMouseUpOrLeave,
	};
};

export { useCarouselMouseEvents };
