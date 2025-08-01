import { useEffect } from "react";

import { type CarouselReference, type CarouselState } from "../types/types.js";
import {
	useCarouselMomentum,
	useCarouselMouseEvents,
	useCarouselWheelEvent,
} from "./hooks.js";

type CarouselEventsProperties = {
	carouselReference: CarouselReference;
	state: CarouselState;
};

const useCarouselEvents = ({
	carouselReference,
	state,
}: CarouselEventsProperties): {
	handleMouseDown: (event: React.MouseEvent) => void;
	handleMouseMove: (event: React.MouseEvent) => void;
	handleMouseUpOrLeave: () => void;
	handleWheelEvent: (event: WheelEvent) => void;
} => {
	const { startMomentum } = useCarouselMomentum({
		carouselReference,
	});

	const mouseHandlers = useCarouselMouseEvents({
		callbacks: {
			startMomentum,
		},
		carouselReference,
		state,
	});

	const handleWheelEvent = useCarouselWheelEvent({
		carouselReference,
		startMomentum,
	});

	useEffect(() => {
		const element = carouselReference.element.current;

		if (element) {
			element.addEventListener("wheel", handleWheelEvent, { passive: false });

			return (): void => {
				element.removeEventListener("wheel", handleWheelEvent);
			};
		}
	}, [handleWheelEvent, carouselReference.element]);

	return {
		...mouseHandlers,
		handleWheelEvent,
	};
};

export { useCarouselEvents };
