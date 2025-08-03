import { ProfileForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Profile = (): React.JSX.Element => {
	return (
		<main className={styles["container"]}>
			<ProfileForm />
		</main>
	);
};

export { Profile };
