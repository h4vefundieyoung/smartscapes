import { type CarouselDirection } from "./types.js";

type CarouselParameters = {
	bounceDirection: CarouselDirection;
	clientWidth: number;
	element: HTMLDivElement | null;
	isAtLeftEdge: boolean;
	isAtRightEdge: boolean;
	maxScroll: number;
	offsetLeft: number;
	scrollLeft: number;
	scrollWidth: number;
};

export { type CarouselParameters };
