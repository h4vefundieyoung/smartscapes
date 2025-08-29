import styles from "./styles.module.css";

const PopularSection = (): React.JSX.Element => {
	return (
		<section className={styles["section"]}>
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Popular routes</h2>
				<ul className={styles["cards"]} />
			</div>
		</section>
	);
};

export { PopularSection };
