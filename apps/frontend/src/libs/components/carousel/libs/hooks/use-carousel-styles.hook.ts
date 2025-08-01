import { useMemo } from "react";

import { combineClassNames } from "~/libs/helpers/helpers.js";

import styles from "../../style.module.css";
import { getCarouselParameters } from "../helpers/get-carousel-parameters.helper.js";
import { type CarouselAnimation } from "../types/types.js";

type CarouselStylesProperties = {
	animationClassName: CarouselAnimation;
	dragging: boolean;
	element: React.RefObject<HTMLDivElement | null>;
	imagesLength: number;
	overdragOffset: number;
};

const useCarouselStyles = ({
	animationClassName,
	dragging,
	element,
	imagesLength,
	overdragOffset,
}: CarouselStylesProperties): {
	carouselClassName: string;
	carouselStyle: React.CSSProperties;
	scrollButtonClassName: string;
	scrollButtonStyle: React.CSSProperties;
} => {
	const carouselClassName = combineClassNames(
		styles["carousel"],
		dragging && styles["dragging"],
		animationClassName && styles[animationClassName],
	);

	const {
		clientWidth,
		direction,
		isAtLeftEdge,
		isAtRightEdge,
		maxScroll,
		offsetLeft,
		scrollBarPosition,
		scrollLeft,
		scrollWidth,
	} = getCarouselParameters(element);

	console.log({
		clientWidth,
		direction,
		element,
		isAtLeftEdge,
		isAtRightEdge,
		maxScroll,
		offsetLeft,
		scrollBarPosition,
		scrollLeft,
		scrollWidth,
	});

	const carouselStyle = useMemo(() => {
		return {
			transform: `translateX(${String(overdragOffset)}px)`,
		};
	}, [overdragOffset]);

	const scrollButtonStyle = useMemo(() => {
		const ONE_HUNDRED = 100;
		const left = `${String(scrollBarPosition)}%`;
		const right = `${String(ONE_HUNDRED - ONE_HUNDRED / imagesLength)}%`;

		console.log({ left, right });

		return {
			left,
			right,
		};
	}, [imagesLength, dragging]);

	const scrollButtonClassName = combineClassNames(
		styles["carousel-scroll-button"],
	);

	return {
		carouselClassName,
		carouselStyle,
		scrollButtonClassName,
		scrollButtonStyle,
	};
};

export { useCarouselStyles };
