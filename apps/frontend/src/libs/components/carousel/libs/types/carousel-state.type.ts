import { type CarouselAnimation } from "./carausel-animation.type.js";

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

export { type CarouselState };
