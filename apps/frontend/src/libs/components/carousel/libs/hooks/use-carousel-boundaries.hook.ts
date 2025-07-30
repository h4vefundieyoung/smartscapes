import { useCallback } from "react";

import { CAROUSEL_ANIMATION, CAROUSEL_CONFIG } from "../constants/constants.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import { type CarouselAnimation } from "../types/carausel-animation.type.js";
import { type CarouselReference } from "../types/types.js";

type CarouselBoundariesProperties = {
	carouselReference: CarouselReference;
	setAnimationClassName: (className: CarouselAnimation) => void;
	setSpringBounce: (value: boolean) => void;
};

const useCarouselBoundaries = ({
	carouselReference,
	setAnimationClassName,
	setSpringBounce,
}: CarouselBoundariesProperties): {
	handleBoundaryCollision: () => void;
} => {
	const handleBoundaryCollision = useCallback((): void => {
		const { direction, element, isAtLeftEdge, isAtRightEdge, maxScroll } =
			getCarouselParameters(carouselReference.element);

		if (!element || carouselReference.isAnimating.current) {
			return;
		}

		if (isAtLeftEdge || isAtRightEdge) {
			const animationClass =
				direction === "left"
					? CAROUSEL_ANIMATION.BOUNCE_LEFT
					: CAROUSEL_ANIMATION.BOUNCE_RIGHT;

			element.scrollLeft = isAtLeftEdge ? 0 : maxScroll;
			carouselReference.isAnimating.current = true;

			setAnimationClassName(animationClass);
			setSpringBounce(true);

			setTimeout(() => {
				setSpringBounce(false);
				setAnimationClassName(null);
				carouselReference.isAnimating.current = false;
			}, CAROUSEL_CONFIG.SPRING_ANIMATION_DURATION);
		}
	}, [carouselReference, setAnimationClassName, setSpringBounce]);

	return {
		handleBoundaryCollision,
	};
};

export { useCarouselBoundaries };
