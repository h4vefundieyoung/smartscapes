import { useCallback, useRef, useState } from "react";

import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";

import styles from "./style.module.css";

type Properties = {
	images: string[];
};

const Carousel = ({ images }: Properties): React.JSX.Element => {
	const carouselReference = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollStart = useRef(0);
	const [dragging, setDragging] = useState<boolean>(false);

	const handleWheel = useCallback((event: React.WheelEvent): void => {
		event.preventDefault();

		if (carouselReference.current) {
			carouselReference.current.scrollLeft += event.deltaY;
		}
	}, []);

	const handleMouseDown = useCallback((event: React.MouseEvent): void => {
		if (!carouselReference.current) {
			return;
		}

		isDragging.current = true;
		startX.current = event.pageX - carouselReference.current.offsetLeft;
		scrollStart.current = carouselReference.current.scrollLeft;
		setDragging(true);
	}, []);

	const handleMouseMove = useCallback((event: React.MouseEvent): void => {
		if (!isDragging.current || !carouselReference.current) {
			return;
		}

		event.preventDefault();
		const x = event.pageX - carouselReference.current.offsetLeft;
		const walk = x - startX.current;
		carouselReference.current.scrollLeft = scrollStart.current - walk;
	}, []);

	const handleMouseUp = useCallback((): void => {
		isDragging.current = false;
		setDragging(false);
	}, []);

	const handleMouseLeave = useCallback((): void => {
		isDragging.current = false;
		setDragging(false);
	}, []);

	const carouselClassName = combineClassNames(
		styles["carousel"],
		dragging && styles["dragging"],
	);

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={carouselClassName}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onWheel={handleWheel}
				ref={carouselReference}
				role="tablist"
				tabIndex={0}
			>
				{images.map((image) => (
					<div className={styles["carousel-item"]} key={image}>
						<img alt="carousel" draggable={false} src={image} />
					</div>
				))}
			</div>
		</div>
	);
};

export { Carousel };
export { mockImages } from "./mock-images.js";
