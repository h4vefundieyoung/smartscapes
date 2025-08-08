import { combineClassNames } from "~/libs/helpers/helpers.js";

import { useNavigationTab } from "./libs/hooks/hooks.js";
import { type TabItem } from "./libs/types/types.js";
import styles from "./styles.module.css";

type TabContainerProperties = {
	tabsData: TabItem[];
};

const TabContainer = ({
	tabsData,
}: TabContainerProperties): React.JSX.Element => {
	const defaultTabId = tabsData[0]?.id ?? "";
	const { activeTabId, setTabInUrl } = useNavigationTab(defaultTabId);

	const activeTabElement = tabsData.find(
		(tab) => tab.id === activeTabId,
	)?.element;

	const handleTabClick = (tabId: string): (() => void) => {
		return () => {
			setTabInUrl(tabId);
		};
	};

	return (
		<div
			className={combineClassNames(
				styles["tab-container"],
				activeTabId === defaultTabId && styles["first-tab-active"],
			)}
		>
			<nav className={styles["tab-navigation"]}>
				{tabsData.map((tab) => (
					<button
						className={combineClassNames(
							styles["tab-item"],
							activeTabId === tab.id && styles["active-tab-item"],
						)}
						key={tab.id}
						onClick={handleTabClick(tab.id)}
						type="button"
					>
						{tab.label}
					</button>
				))}
			</nav>
			<div className={styles["tab-content"]}>{activeTabElement}</div>
		</div>
	);
};

export { TabContainer };
export { type TabItem } from "./libs/types/types.js";
