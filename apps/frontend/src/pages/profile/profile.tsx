import { Button } from "~/libs/components/button/button.js";
import { TabContainer } from "~/libs/components/components.js";

import { Photos, UserDetails } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Profile = (): React.JSX.Element => {
	const tabs = [
		{
			element: <UserDetails />,
			id: "user-details",
			label: "User details",
		},
		{
			element: <Photos />,
			id: "photos",
			label: "Photos",
		},
	];

	return (
		<main className={styles["profile-container"]}>
			<h1 className={styles["profile-title"]}>My Profile</h1>
			<TabContainer
				activeTabClassName={styles["profile-active-tab"]}
				containerClassName={styles["profile-tab-container"]}
				contentClassName={styles["profile-content"]}
				defaultTabId="user-details"
				navigationClassName={styles["profile-navigation"]}
				tabClassName={styles["profile-tab"]}
				tabs={tabs}
			/>
			<Button label="Delete Account" />
		</main>
	);
};

export { Profile };
