import { Button, TabContainer } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

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

	const handleDeleteAccount = useCallback(() => {}, []);

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
			<Button label="Delete Account" onClick={handleDeleteAccount} />
		</main>
	);
};

export { Profile };
