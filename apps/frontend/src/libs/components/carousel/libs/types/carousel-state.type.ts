import { type CarauselAnimationType } from "./carausel-animation-type.type.js";

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

export { type CarouselState };
