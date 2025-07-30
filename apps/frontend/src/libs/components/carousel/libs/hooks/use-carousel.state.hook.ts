import { useState } from "react";

import { type CarouselAnimation } from "../types/types.js";

type CarouselState = {
	animationClassName: CarouselAnimation;
	dragging: boolean;
	overdragOffset: number;
	setAnimationClassName: (className: CarouselAnimation) => void;
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
		useState<CarouselAnimation>(null);

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
