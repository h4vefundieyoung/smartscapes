import styles from "./styles.module.css";

type Properties = {
	images: string[];
};

const ImageGallery = ({ images }: Properties): React.JSX.Element => {
	const imageList = images.map((url, index) => (
		<img
			alt="point of interest picutre"
			className={styles["image"]}
			key={index}
			src={url}
		/>
	));

	return <section className={styles["container"]}>{imageList}</section>;
};

export { ImageGallery };
