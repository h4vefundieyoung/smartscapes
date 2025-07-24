import landingCover from "../../../../public/assets/images/landing-cover.png";
import styles from "./styles.module.css";

const Landing = (): React.JSX.Element => {
	return (
		<main className={styles["landing"]}>
			<div className={styles["landing-header"]}>
				<h1 className={styles["landing-title"]}>
					Discover Your Next Adventure
				</h1>

				<h4 className={styles["landing-description"]}>
					Find the best trails for hiking, biking, and exploring the outdoors
					wherever you are.
				</h4>
			</div>

			<img
				alt="Landing - forest view"
				className={styles["landing-cover"]}
				src={landingCover}
			/>
		</main>
	);
};

export { Landing };
