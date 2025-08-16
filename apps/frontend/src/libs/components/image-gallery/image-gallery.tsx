import styles from "./styles.module.css";

type Properties = {
	mainImage: string;
	subImages: [string, string];
};

const ImageGallery = ({
	mainImage,
	subImages: [subImage, _subImage],
}: Properties): React.JSX.Element => {
	return (
		<section className={styles["container"]}>
			<img alt="main" className={styles["image"]} src={mainImage} />

			<img alt="sub" className={styles["image"]} src={subImage} />
			<img alt="sub" className={styles["image"]} src={_subImage} />
		</section>
	);
};

export { ImageGallery };
