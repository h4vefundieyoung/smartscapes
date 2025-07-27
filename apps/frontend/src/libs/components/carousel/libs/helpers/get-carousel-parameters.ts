import { CarauselConfig } from "../enums/enums.js";
import { type CarouselParameters } from "../types/types.js";

const initialCarouselParameters: CarouselParameters = {
	clientWidth: 0,
	direction: null,
	element: null,
	isAtLeftEdge: false,
	isAtRightEdge: false,
	maxScroll: 0,
	offsetLeft: 0,
	scrollLeft: 0,
	scrollWidth: 0,
};

const getCarouselParameters = (
	reference: React.RefObject<HTMLDivElement | null>,
): CarouselParameters => {
	if (!reference.current) {
		return initialCarouselParameters;
	}

	const element = reference.current;

	const maxScroll = element.scrollWidth - element.clientWidth;

	const edgeThreshold = CarauselConfig.EDGE_THRESHOLD;

	const isAtLeftEdge = element.scrollLeft <= edgeThreshold;

	const isAtRightEdge = element.scrollLeft >= maxScroll - edgeThreshold;

	const direction = isAtLeftEdge ? "left" : "right";

	const { clientWidth, offsetLeft, scrollLeft, scrollWidth } =
		reference.current;

	return {
		clientWidth,
		direction,
		element,
		isAtLeftEdge,
		isAtRightEdge,
		maxScroll,
		offsetLeft,
		scrollLeft,
		scrollWidth,
	};
};

export { getCarouselParameters };
