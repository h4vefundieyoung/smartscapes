import { combineClassNames } from "~/libs/helpers/helpers.js";

import { type TabItem } from "./libs/types/types.js";
import styles from "./styles.module.css";

type TabContainerProperties = {
	activeTabId: string;
	onTabChange: (tabId: string) => void;
	tabsData: TabItem[];
};

const TabContainer = ({
	activeTabId,
	onTabChange,
	tabsData,
}: TabContainerProperties): React.JSX.Element => {
	const activeTabElement = tabsData.find(
		(tab) => tab.id === activeTabId,
	)?.element;

	const handleTabClick = (tabId: string): (() => void) => {
		return () => {
			onTabChange(tabId);
		};
	};

	return (
		<div
			className={combineClassNames(
				styles["tab-container"],
				activeTabId === tabsData[0]?.id && styles["first-tab-active"],
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
