import { TabContainer } from "~/libs/components/components.js";

import { PROFILE_TABS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Profile = (): React.JSX.Element => {
	return (
		<main className={styles["profile-container"]}>
			<h1 className={styles["profile-title"]}>My Profile</h1>
			<TabContainer tabsData={PROFILE_TABS} />
		</main>
	);
};

export { Profile };
