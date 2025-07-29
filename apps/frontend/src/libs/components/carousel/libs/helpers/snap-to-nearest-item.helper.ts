import { carouselConfig } from "../enums/carausel-config.enum.js";
import { getCarouselParameters } from "./helpers.js";

const snapToNearestItem = (
	carouselReference: {
		element: React.RefObject<HTMLDivElement | null>;
	},
	snapDelay: number,
): void => {
	const { clientWidth, element, maxScroll } = getCarouselParameters(
		carouselReference.element,
	);

	if (!element) {
		return;
	}

	const itemWidth = clientWidth * carouselConfig.ITEM_WIDTH_PERCENTAGE;
	const currentScrollLeft = element.scrollLeft;
	const nearestPosition = Math.round(currentScrollLeft / itemWidth) * itemWidth;
	const clampedPosition = Math.max(0, Math.min(nearestPosition, maxScroll));

	setTimeout(() => {
		element.scrollTo({
			behavior: "smooth",
			left: clampedPosition,
		});
	}, snapDelay);
};

export { snapToNearestItem };
