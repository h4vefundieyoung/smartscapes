import { PageHeading, TabContainer } from "~/libs/components/components.js";
import { useTabNavigation } from "~/libs/hooks/hooks.js";

import { PROFILE_TABS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Profile = (): React.JSX.Element => {
	const initialTabId = PROFILE_TABS[0]?.id ?? "";
	const { activeTabId, handleTabChange } = useTabNavigation(
		initialTabId,
		"profile-tab",
	);

	return (
		<main className={styles["profile-container"]}>
			<PageHeading
				subtitle="Update your profile and manage reviews."
				title="Profile"
			/>
			<TabContainer
				activeTabId={activeTabId}
				onTabChange={handleTabChange}
				tabsData={PROFILE_TABS}
			/>
		</main>
	);
};

export { Profile };
