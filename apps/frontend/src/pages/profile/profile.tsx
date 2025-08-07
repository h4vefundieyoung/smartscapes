import { TabContainer } from "~/libs/components/components.js";

import { MyReviews, UserDetails } from "./libs/components/components.js";
import styles from "./styles.module.css";

const PROFILE_TABS = [
	{
		element: <UserDetails />,
		id: "user-details",
		label: "User details",
	},
	{
		element: <MyReviews />,
		id: "my-reviews",
		label: "My reviews",
	},
];

const Profile = (): React.JSX.Element => {
	return (
		<main className={styles["profile-container"]}>
			<h1 className={styles["profile-title"]}>My Profile</h1>
			<TabContainer tabsData={PROFILE_TABS} />
		</main>
	);
};

export { Profile };
