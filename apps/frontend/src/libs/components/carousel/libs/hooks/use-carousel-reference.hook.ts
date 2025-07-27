import { useRef } from "react";

import { type CarouselReference } from "../types/types.js";

const useCarouselReference = (): CarouselReference => {
	const carouselReference = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollStart = useRef(0);
	const velocity = useRef(0);
	const momentumID = useRef<null | number>(null);
	const isAnimating = useRef<boolean>(false);

	return {
		carouselReference,
		isAnimating,
		isDragging,
		momentumID,
		scrollStart,
		startX,
		velocity,
	};
};

export { useCarouselReference };
