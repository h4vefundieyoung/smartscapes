import { useCallback } from "~/libs/hooks/hooks.js";

import { type CarouselReference } from "../types/types.js";

type CarouselEvents = {
	handleMouseLeave: () => void;
};

const useMouseLeave = (
	carouselReference: CarouselReference,
	startMomentum: () => void,
): CarouselEvents => {
	const handleMouseLeave = useCallback((): void => {
		if (Math.abs(carouselReference.velocity.current) > 0) {
			startMomentum();
		}

		if (carouselReference.element.current) {
			carouselReference.element.current.style.scrollbarColor =
				"transparent transparent";
		}
	}, [startMomentum, carouselReference]);

	return {
		handleMouseLeave,
	};
};

export { useMouseLeave };
