import { useCallback } from "~/libs/hooks/hooks.js";

import { type CarouselReference } from "../types/types.js";

type CarouselEvents = {
	handleMouseLeave: () => void;
};

const useMouseLeave = (
	carouselReference: CarouselReference,
	startMomentum: () => void,
): CarouselEvents => {
	const removeFocus = useCallback((): void => {
		const element = carouselReference.element.current;

		if (element) {
			element.blur();
		}
	}, [carouselReference.element]);

	const handleMouseLeave = useCallback((): void => {
		removeFocus();

		if (Math.abs(carouselReference.velocity.current) > 0) {
			startMomentum();
		}
	}, [startMomentum, carouselReference, removeFocus]);

	return {
		handleMouseLeave,
	};
};

export { useMouseLeave };
