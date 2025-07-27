import { useEffect } from "react";

import {
	type CarouselDirection,
	type CarouselReference,
} from "../types/types.js";
import {
	useCarouselBoundaries,
	useCarouselMomentum,
	useCarouselMouseEvents,
	useCarouselWheelEvent,
} from "./hooks.js";

type CarouselEventsProperties = {
	carouselReference: CarouselReference;
	state: {
		overdragOffset: number;
		setBounceDirection: (direction: CarouselDirection) => void;
		setDragging: (value: boolean) => void;
		setOverdragOffset: (value: number) => void;
		setSlingshotDirection: (direction: CarouselDirection) => void;
		setSpringBounce: (value: boolean) => void;
	};
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
	const { checkBoundaries } = useCarouselBoundaries({
		carouselReference,
		setBounceDirection: state.setBounceDirection,
		setSpringBounce: state.setSpringBounce,
	});

	const { startMomentum } = useCarouselMomentum({
		carouselReference,
		checkBoundaries,
	});

	const mouseHandlers = useCarouselMouseEvents({
		callbacks: {
			checkBoundaries,
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
		const element = carouselReference.carouselReference.current;

		if (element) {
			element.addEventListener("wheel", handleWheelEvent, { passive: false });

			return (): void => {
				element.removeEventListener("wheel", handleWheelEvent);
			};
		}
	}, [handleWheelEvent, carouselReference]);

	return {
		...mouseHandlers,
		handleWheelEvent,
	};
};

export { useCarouselEvents };
