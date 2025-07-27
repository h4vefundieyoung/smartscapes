import { useCallback } from "react";

import { CarauselConfig } from "../enums/enums.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import { type CarouselReference } from "../types/types.js";

type CarouselMomentumProperties = {
	carouselReference: CarouselReference;
	checkBoundaries: () => void;
};

const useCarouselMomentum = ({
	carouselReference,
	checkBoundaries,
}: CarouselMomentumProperties): {
	startMomentum: () => void;
} => {
	const animateMomentum = useCallback((): void => {
		const { element, isAtLeftEdge, isAtRightEdge } = getCarouselParameters({
			carouselReference: carouselReference.carouselReference,
		});

		if (!element) {
			return;
		}

		carouselReference.velocity.current *= CarauselConfig.FRICTION;

		if (
			Math.abs(carouselReference.velocity.current) < CarauselConfig.MIN_VELOCITY
		) {
			carouselReference.velocity.current = 0;
			carouselReference.momentumID.current = null;

			checkBoundaries();

			return;
		}

		element.scrollLeft -=
			carouselReference.velocity.current * CarauselConfig.SCROLL_SPEED;

		if (isAtLeftEdge || isAtRightEdge) {
			checkBoundaries();
			carouselReference.velocity.current = 0;
			carouselReference.momentumID.current = null;

			return;
		}

		carouselReference.momentumID.current =
			requestAnimationFrame(animateMomentum);
	}, [checkBoundaries, carouselReference]);

	const startMomentum = useCallback((): void => {
		if (carouselReference.momentumID.current) {
			cancelAnimationFrame(carouselReference.momentumID.current);
		}

		carouselReference.isAnimating.current = false;

		carouselReference.momentumID.current =
			requestAnimationFrame(animateMomentum);
	}, [animateMomentum, carouselReference]);

	return {
		startMomentum,
	};
};

export { useCarouselMomentum };
