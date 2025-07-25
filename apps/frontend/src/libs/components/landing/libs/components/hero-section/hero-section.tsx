import styles from "./styles.module.css";

const Landing = (): React.JSX.Element => {
	return (
		<main className={styles["landing"]}>
			<div className={styles["landing-hero"]}>
				<h1 className={styles["landing-title"]}>
					Discover Your Next Adventure
				</h1>

				<p className={styles["landing-description"]}>
					Find the best trails for hiking, biking, and exploring the outdoors
					wherever you are.
				</p>
			</div>

			<img
				alt="Landing - forest view"
				className={styles["landing-cover"]}
				src="/assets/images/landing-cover.png"
			/>
		</main>
	);
};

export { Landing };
