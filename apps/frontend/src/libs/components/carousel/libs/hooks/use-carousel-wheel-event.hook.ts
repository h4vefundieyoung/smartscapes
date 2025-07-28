import { useCallback } from "react";

import { carouselConfig } from "../enums/enums.js";
import { type CarouselReference } from "../types/types.js";

type CarouselWheelEventProperties = {
	carouselReference: CarouselReference;
	startMomentum: () => void;
};

const useCarouselWheelEvent = ({
	carouselReference,
	startMomentum,
}: CarouselWheelEventProperties): ((event: WheelEvent) => void) => {
	return useCallback(
		(event: WheelEvent): void => {
			event.preventDefault();

			if (carouselReference.element.current) {
				carouselReference.velocity.current +=
					event.deltaY * carouselConfig.WHEEL_MULTIPLIER;

				if (!carouselReference.momentumID.current) {
					startMomentum();
				}
			}
		},
		[startMomentum, carouselReference],
	);
};

export { useCarouselWheelEvent };
