import { useCallback, useRef } from "react";

import styles from "./style.module.css";

type Properties = {
	images: string[];
};

const Carousel = ({ images }: Properties): React.JSX.Element => {
	const carouselReference = useRef<HTMLDivElement>(null);

	const handleWheel = useCallback((event: React.WheelEvent): void => {
		event.preventDefault();

		if (carouselReference.current) {
			carouselReference.current.scrollLeft += event.deltaY;
		}
	}, []);

	return (
		<div className={styles["carousel-container"]}>
			<div
				className={styles["carousel"]}
				onWheel={handleWheel}
				ref={carouselReference}
			>
				{images.map((image) => (
					<div className={styles["carousel-item"]} key={image}>
						<img alt="carousel" src={image} />
					</div>
				))}
			</div>
		</div>
	);
};

export { Carousel };
export { mockImages } from "./mock-images.js";
