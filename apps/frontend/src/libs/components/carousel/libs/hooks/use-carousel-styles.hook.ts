import { useMemo } from "react";

import { combineClassNames } from "~/libs/helpers/helpers.js";

import styles from "../../style.module.css";
import { type CarouselAnimation } from "../types/types.js";

type CarouselStylesProperties = {
	animationClassName: CarouselAnimation;
	dragging: boolean;
	overdragOffset: number;
};

const useCarouselStyles = ({
	animationClassName,
	dragging,
	overdragOffset,
}: CarouselStylesProperties): {
	carouselClassName: string;
	carouselStyle: React.CSSProperties;
} => {
	const carouselClassName = combineClassNames(
		styles["carousel"],
		dragging && styles["dragging"],
		animationClassName && styles[animationClassName],
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
