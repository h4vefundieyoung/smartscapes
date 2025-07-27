import { useState } from "react";

import { type CarouselDirection } from "../types/types.js";

type CarouselState = {
	bounceDirection: CarouselDirection;
	dragging: boolean;
	overdragOffset: number;
	setBounceDirection: (direction: CarouselDirection) => void;
	setDragging: (value: boolean) => void;
	setOverdragOffset: (value: number) => void;
	setSlingshotDirection: (direction: CarouselDirection) => void;
	setSpringBounce: (value: boolean) => void;
	slingshotDirection: CarouselDirection;
	springBounce: boolean;
};

const useCarouselState = (): CarouselState => {
	const [dragging, setDragging] = useState<boolean>(false);
	const [springBounce, setSpringBounce] = useState<boolean>(false);
	const [bounceDirection, setBounceDirection] =
		useState<CarouselDirection>(null);
	const [slingshotDirection, setSlingshotDirection] =
		useState<CarouselDirection>(null);

	const [overdragOffset, setOverdragOffset] = useState<number>(0);

	return {
		bounceDirection,
		dragging,
		overdragOffset,
		setBounceDirection,
		setDragging,
		setOverdragOffset,
		setSlingshotDirection,
		setSpringBounce,
		slingshotDirection,
		springBounce,
	};
};

export { useCarouselState };
