import { CAROUSEL_CONFIG } from "../constants/constants.js";
import { type CarouselParameters } from "../types/types.js";

const INITIAL_CAROUSEL_PARAMETERS: CarouselParameters = {
	clientWidth: 0,
	direction: null,
	element: null,
	isAtLeftEdge: false,
	isAtRightEdge: false,
	maxScroll: 0,
	offsetLeft: 0,
	scrollBarPosition: 0,
	scrollBarWidthPercent: 0,
	scrollLeft: 0,
	scrollWidth: 0,
};

const getCarouselParameters = (
	reference: React.RefObject<HTMLDivElement | null>,
): CarouselParameters => {
	if (!reference.current) {
		return INITIAL_CAROUSEL_PARAMETERS;
	}

	const ONE_HUNDRED = 100;

	const element = reference.current;

	const maxScroll = element.scrollWidth - element.clientWidth;

	const edgeThreshold = CAROUSEL_CONFIG.EDGE_THRESHOLD;

	const isAtLeftEdge = element.scrollLeft <= edgeThreshold;

	const isAtRightEdge = element.scrollLeft >= maxScroll - edgeThreshold;

	const direction = isAtLeftEdge ? "left" : "right";

	const { clientWidth, offsetLeft, scrollLeft, scrollWidth } =
		reference.current;

	const scrollBarPosition =
		maxScroll > 0 ? (scrollLeft / maxScroll) * ONE_HUNDRED : 0;

	const scrollBarWidthPercent =
		scrollWidth > 0 ? (clientWidth / scrollWidth) * ONE_HUNDRED : ONE_HUNDRED;

	return {
		clientWidth,
		direction,
		element,
		isAtLeftEdge,
		isAtRightEdge,
		maxScroll,
		offsetLeft,
		scrollBarPosition,
		scrollBarWidthPercent,
		scrollLeft,
		scrollWidth,
	};
};

export { getCarouselParameters };
