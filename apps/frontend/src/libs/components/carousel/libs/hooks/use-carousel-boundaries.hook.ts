import { useCallback } from "react";

import { CarauselConfig } from "../enums/enums.js";
import { getCarouselParameters } from "../helpers/helpers.js";
import {
	type CarouselDirection,
	type CarouselReference,
} from "../types/types.js";

type CarouselBoundariesProperties = {
	carouselReference: CarouselReference;
	setBounceDirection: (direction: CarouselDirection) => void;
	setSpringBounce: (value: boolean) => void;
};

const useCarouselBoundaries = ({
	carouselReference,
	setBounceDirection,
	setSpringBounce,
}: CarouselBoundariesProperties): {
	checkBoundaries: () => void;
} => {
	const checkBoundaries = useCallback((): void => {
		const { bounceDirection, element, isAtLeftEdge, isAtRightEdge, maxScroll } =
			getCarouselParameters({
				carouselReference: carouselReference.carouselReference,
			});

		if (!element || carouselReference.isAnimating.current) {
			return;
		}

		if (isAtLeftEdge || isAtRightEdge) {
			element.scrollLeft = isAtLeftEdge ? 0 : maxScroll;
			setBounceDirection(bounceDirection);

			carouselReference.isAnimating.current = true;
			setSpringBounce(true);

			setTimeout(() => {
				setSpringBounce(false);
				setBounceDirection(null);
				carouselReference.isAnimating.current = false;
			}, CarauselConfig.SPRING_ANIMATION_DURATION);
		}
	}, [carouselReference, setBounceDirection, setSpringBounce]);

	return {
		checkBoundaries,
	};
};

export { useCarouselBoundaries };
