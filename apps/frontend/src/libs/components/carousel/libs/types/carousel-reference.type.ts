type CarouselReference = {
	carouselReference: React.RefObject<HTMLDivElement | null>;
	isAnimating: React.RefObject<boolean>;
	isDragging: React.RefObject<boolean>;
	momentumID: React.RefObject<null | number>;
	scrollStart: React.RefObject<number>;
	startX: React.RefObject<number>;
	velocity: React.RefObject<number>;
};

export { type CarouselReference };
