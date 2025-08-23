import { Button } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	handleDelete?: (id: number) => void;
	images: {
		id: number;
		url: string;
	}[];
	isEditMode: boolean;
};

const ImageGallery = ({
	handleDelete,
	images,
	isEditMode,
}: Properties): React.JSX.Element => {
	const handleClick = (id: number) => (): void => {
		if (handleDelete) {
			handleDelete(id);
		}
	};

	const imageList = images.map((image) => (
		<div className={styles["image"]} key={image.id}>
			<img
				alt="point of interest"
				className={styles["image"]}
				src={image.url}
			/>
			{isEditMode ? (
				<div className={styles["delete-button"]}>
					<Button
						label="Delete"
						onClick={handleClick(image.id)}
						type="button"
					/>
				</div>
			) : null}
		</div>
	));

	return <section className={styles["container"]}>{imageList}</section>;
};

export { ImageGallery };
