import { useState } from "react";

type CarouselState = {
	dragging: boolean;
	setDragging: (value: boolean) => void;
};

const useCarouselState = (): CarouselState => {
	const [dragging, setDragging] = useState<boolean>(false);

	return {
		dragging,
		setDragging,
	};
};

export { useCarouselState };
