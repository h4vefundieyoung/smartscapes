import styles from "./styles.module.css";

type Properties = {
	images: null | string[];
};

const ImageGallery = ({ images }: Properties): React.JSX.Element => {
	const imageList = images
		? images.map((url, index) => (
				<img
					alt="point of interest picutre"
					className={styles["image"]}
					key={index}
					src={url}
				/>
			))
		: null;

	return <section className={styles["container"]}>{imageList}</section>;
};

export { ImageGallery };
