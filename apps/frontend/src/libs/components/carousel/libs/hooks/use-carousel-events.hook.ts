import { useEffect } from "react";

import {
	type CarauselAnimationType,
	type CarouselReference,
} from "../types/types.js";
import {
	useCarouselBoundaries,
	useCarouselMomentum,
	useCarouselMouseEvents,
	useCarouselWheelEvent,
} from "./hooks.js";

type CarouselEventsProperties = {
	carouselElement: React.RefObject<HTMLDivElement | null>;
	isAnimating: React.RefObject<boolean>;
	isDragging: React.RefObject<boolean>;
	momentumID: React.RefObject<null | number>;
	overdragOffset: number;
	scrollStart: React.RefObject<number>;
	setAnimationClassName: (className: CarauselAnimationType) => void;
	setDragging: (value: boolean) => void;
	setOverdragOffset: (value: number) => void;
	setSpringBounce: (value: boolean) => void;
	startX: React.RefObject<number>;
	velocity: React.RefObject<number>;
};

const useCarouselEvents = ({
	carouselElement,
	isAnimating,
	isDragging,
	momentumID,
	overdragOffset,
	scrollStart,
	setAnimationClassName,
	setDragging,
	setOverdragOffset,
	setSpringBounce,
	startX,
	velocity,
}: CarouselEventsProperties): {
	handleMouseDown: (event: React.MouseEvent) => void;
	handleMouseMove: (event: React.MouseEvent) => void;
	handleMouseUpOrLeave: () => void;
	handleWheelEvent: (event: WheelEvent) => void;
} => {
	const carouselReference: CarouselReference = {
		carouselReference: carouselElement,
		isAnimating,
		isDragging,
		momentumID,
		scrollStart,
		startX,
		velocity,
	};

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
		overdragOffset,
		setAnimationClassName,
		setDragging,
		setOverdragOffset,
		setSpringBounce,
	});

	const handleWheelEvent = useCarouselWheelEvent({
		carouselReference,
		startMomentum,
	});

	useEffect(() => {
		const element = carouselElement.current;

		if (element) {
			element.addEventListener("wheel", handleWheelEvent, { passive: false });

			return (): void => {
				element.removeEventListener("wheel", handleWheelEvent);
			};
		}
	}, [handleWheelEvent, carouselElement]);

	return {
		...mouseHandlers,
		handleWheelEvent,
	};
};

export { useCarouselEvents };
