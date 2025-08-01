import { type CarouselDirection } from "./types.js";

type CarouselParameters = {
	clientWidth: number;
	direction: CarouselDirection;
	element: HTMLDivElement | null;
	isAtLeftEdge: boolean;
	isAtRightEdge: boolean;
	maxScroll: number;
	offsetLeft: number;
	scrollBarPosition: number;
	scrollBarWidthPercent: number;
	scrollLeft: number;
	scrollWidth: number;
};

export { type CarouselParameters };
