import styles from "./styles.module.css";

const Profile = (): React.JSX.Element => {
	return (
		<main className={styles["container"]}>
			<div className={styles["profile-container"]}>
				<div className={styles["profile-message"]}>
					<p>User profile & settings</p>
				</div>
			</div>
		</main>
	);
};

export { Profile };
