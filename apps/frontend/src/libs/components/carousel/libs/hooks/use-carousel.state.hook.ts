import { useState } from "react";

import { type CarauselAnimationType } from "../types/types.js";

type CarouselState = {
	animationClassName: CarauselAnimationType;
	dragging: boolean;
	overdragOffset: number;
	setAnimationClassName: (className: CarauselAnimationType) => void;
	setDragging: (value: boolean) => void;
	setOverdragOffset: (value: number) => void;
	setSpringBounce: (value: boolean) => void;
	springBounce: boolean;
};

const useCarouselState = (): CarouselState => {
	const [dragging, setDragging] = useState<boolean>(false);
	const [springBounce, setSpringBounce] = useState<boolean>(false);
	const [overdragOffset, setOverdragOffset] = useState<number>(0);
	const [animationClassName, setAnimationClassName] =
		useState<CarauselAnimationType>(null);

	return {
		animationClassName,
		dragging,
		overdragOffset,
		setAnimationClassName,
		setDragging,
		setOverdragOffset,
		setSpringBounce,
		springBounce,
	};
};

export { useCarouselState };
