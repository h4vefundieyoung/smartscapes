import styles from "./styles.module.css";

const HeroSection = (): React.JSX.Element => {
	return (
		<section className={styles["hero-section"]}>
			<div>
				<h1 className={styles["hero-section-title"]}>
					Discover Your Next Adventure
				</h1>

				<p className={styles["hero-section-description"]}>
					Find the best trails for hiking, biking, and exploring the outdoors
					wherever you are.
				</p>
			</div>

			<img
				alt="Landing - forest view"
				className={styles["hero-section-cover"]}
				src="/assets/images/landing-cover.png"
			/>
		</section>
	);
};

export { HeroSection };
