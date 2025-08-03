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
		<main className={styles["container"]}>
			<h1 className={styles["title"]}>My Profile</h1>
			<TabContainer
				activeTabClassName={styles["tabActive"]}
				containerClassName={styles["tabContainer"]}
				contentClassName={styles["tabContent"]}
				defaultTabId="user-details"
				navigationClassName={styles["tabNavigation"]}
				tabClassName={styles["tab"]}
				tabs={tabs}
			/>
			<Button label="Delete Account" />
		</main>
	);
};

export { Profile };
