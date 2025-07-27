import { useCallback } from "react";

import { CarauselConfig } from "../enums/enums.js";
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

			if (carouselReference.carouselReference.current) {
				carouselReference.velocity.current +=
					event.deltaY * CarauselConfig.WHEEL_MULTIPLIER;

				if (!carouselReference.momentumID.current) {
					startMomentum();
				}
			}
		},
		[startMomentum, carouselReference],
	);
};

export { useCarouselWheelEvent };
