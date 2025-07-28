import { useCallback } from "react";

import { carouselConfig } from "../enums/enums.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import { type CarouselReference } from "../types/types.js";

type CarouselMomentumProperties = {
	carouselReference: CarouselReference;
	handleBoundaryCollision: () => void;
};

const useCarouselMomentum = ({
	carouselReference,
	handleBoundaryCollision,
}: CarouselMomentumProperties): {
	startMomentum: () => void;
} => {
	const animateMomentum = useCallback((): void => {
		const { element, isAtLeftEdge, isAtRightEdge } = getCarouselParameters(
			carouselReference.element,
		);

		if (!element) {
			return;
		}

		carouselReference.velocity.current *= carouselConfig.FRICTION;

		if (
			Math.abs(carouselReference.velocity.current) < carouselConfig.MIN_VELOCITY
		) {
			carouselReference.velocity.current = 0;
			carouselReference.momentumID.current = null;

			handleBoundaryCollision();

			return;
		}

		element.scrollLeft -=
			carouselReference.velocity.current * carouselConfig.SCROLL_SPEED;

		if (isAtLeftEdge || isAtRightEdge) {
			handleBoundaryCollision();
			carouselReference.velocity.current = 0;
			carouselReference.momentumID.current = null;

			return;
		}

		carouselReference.momentumID.current =
			requestAnimationFrame(animateMomentum);
	}, [handleBoundaryCollision, carouselReference]);

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
