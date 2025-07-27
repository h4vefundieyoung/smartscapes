import { useEffect } from "react";

import { type CarouselReference, type CarouselState } from "../types/types.js";
import {
	useCarouselBoundaries,
	useCarouselMomentum,
	useCarouselMouseEvents,
	useCarouselWheelEvent,
} from "./hooks.js";

type CarouselEventsProperties = {
	carouselReference: CarouselReference;
	state: CarouselStateSetters;
};

type CarouselStateSetters = Pick<
	CarouselState,
	| "overdragOffset"
	| "setAnimationClassName"
	| "setDragging"
	| "setOverdragOffset"
	| "setSpringBounce"
>;

const useCarouselEvents = ({
	carouselReference,
	state,
}: CarouselEventsProperties): {
	handleMouseDown: (event: React.MouseEvent) => void;
	handleMouseMove: (event: React.MouseEvent) => void;
	handleMouseUpOrLeave: () => void;
	handleWheelEvent: (event: WheelEvent) => void;
} => {
	const { setAnimationClassName, setSpringBounce } = state;

	const { handleBoundaryCollision } = useCarouselBoundaries({
		carouselReference,
		setAnimationClassName,
		setSpringBounce,
	});

	const { startMomentum } = useCarouselMomentum({
		carouselReference,
		handleBoundaryCollision,
	});

	const mouseHandlers = useCarouselMouseEvents({
		callbacks: {
			handleBoundaryCollision,
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
