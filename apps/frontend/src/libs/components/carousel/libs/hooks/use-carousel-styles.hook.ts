import { useMemo } from "react";

import { combineClassNames } from "~/libs/helpers/helpers.js";

import styles from "../../style.module.css";
import { type CarouselDirection } from "../types/types.js";

type CarouselStylesProperties = {
	bounceDirection: CarouselDirection;
	dragging: boolean;
	overdragOffset: number;
	slingshotDirection: CarouselDirection;
	springBounce: boolean;
};

const useCarouselStyles = ({
	bounceDirection,
	dragging,
	overdragOffset,
	slingshotDirection,
	springBounce,
}: CarouselStylesProperties): {
	carouselClassName: string;
	carouselStyle: React.CSSProperties;
} => {
	const carouselClassName = combineClassNames(
		styles["carousel"],
		dragging && styles["dragging"],
		springBounce && bounceDirection && styles[`bounce-${bounceDirection}`],
		slingshotDirection && styles[`slingshot-${slingshotDirection}`],
	);

	const carouselStyle = useMemo(() => {
		return {
			transform: `translateX(${String(overdragOffset)}px)`,
		};
	}, [overdragOffset]);

	return {
		carouselClassName,
		carouselStyle,
	};
};

export { useCarouselStyles };
