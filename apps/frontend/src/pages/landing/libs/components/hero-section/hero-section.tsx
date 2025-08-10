import styles from "./styles.module.css";

const HeroSection = (): React.JSX.Element => {
	return (
		<section className={styles["hero-section"]}>
			<div className={styles["hero-section-container"]}>
				<h1 className={styles["title"]}>Discover Your Next Adventure</h1>

				<p className={styles["description"]}>
					Find the best trails for hiking, biking, and exploring the outdoors
					wherever you are.
				</p>
			</div>

			<div className={styles["cover"]} />
		</section>
	);
};

export { HeroSection };
