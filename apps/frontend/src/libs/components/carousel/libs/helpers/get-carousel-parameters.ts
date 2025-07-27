import { CarauselConfig } from "../enums/enums.js";
import { type CarouselParameters } from "../types/types.js";

type Properties = {
	carouselReference: React.RefObject<HTMLDivElement | null>;
};

const initialCarouselParameters: CarouselParameters = {
	bounceDirection: null,
	clientWidth: 0,
	element: null,
	isAtLeftEdge: false,
	isAtRightEdge: false,
	maxScroll: 0,
	offsetLeft: 0,
	scrollLeft: 0,
	scrollWidth: 0,
};

const getCarouselParameters = ({
	carouselReference,
}: Properties): CarouselParameters => {
	if (!carouselReference.current) {
		return initialCarouselParameters;
	}

	const element = carouselReference.current;

	const maxScroll = element.scrollWidth - element.clientWidth;

	const edgeThreshold = CarauselConfig.EDGE_THRESHOLD;

	const isAtLeftEdge = element.scrollLeft <= edgeThreshold;

	const isAtRightEdge = element.scrollLeft >= maxScroll - edgeThreshold;

	const direction = isAtLeftEdge ? "left" : "right";

	const { clientWidth, offsetLeft, scrollLeft, scrollWidth } =
		carouselReference.current;

	return {
		bounceDirection: direction,
		clientWidth,
		element: carouselReference.current,
		isAtLeftEdge,
		isAtRightEdge,
		maxScroll,
		offsetLeft,
		scrollLeft,
		scrollWidth,
	};
};

export { getCarouselParameters };
