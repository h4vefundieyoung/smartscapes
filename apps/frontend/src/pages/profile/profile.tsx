import { Button, TabContainer } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import { Photos, UserDetails } from "./libs/components/components.js";
import styles from "./styles.module.css";

const PROFILE_TABS = [
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

const Profile = (): React.JSX.Element => {
	const handleDeleteAccount = useCallback(() => {}, []);

	return (
		<main className={styles["profile-container"]}>
			<h1 className={styles["profile-title"]}>My Profile</h1>
			<TabContainer tabsData={PROFILE_TABS} />
			<Button label="Delete Account" onClick={handleDeleteAccount} />
		</main>
	);
};

export { Profile };
