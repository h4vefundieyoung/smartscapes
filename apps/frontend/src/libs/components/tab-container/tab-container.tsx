import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useState } from "~/libs/hooks/hooks.js";

import { type TabContainerProperties } from "./libs/types/types.js";
import styles from "./styles.module.css";

const TabContainer = ({
	activeTabClassName,
	containerClassName,
	contentClassName,
	defaultTabId,
	navigationClassName,
	tabClassName,
	tabs,
}: TabContainerProperties): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState<string>(() => {
		if (defaultTabId && tabs.some((tab) => tab.id === defaultTabId)) {
			return defaultTabId;
		}

		return tabs[0]?.id ?? "";
	});

	const activeTabData = tabs.find((tab) => tab.id === activeTab);

	const handleTabClick = (tabId: string): (() => void) => {
		return () => {
			setActiveTab(tabId);
		};
	};

	const containerClass = combineClassNames(
		styles["container"],
		containerClassName,
	);

	const navigationClass = combineClassNames(
		styles["navigation"],
		navigationClassName,
	);

	const tabClass = combineClassNames(styles["tab"], tabClassName);

	return (
		<div className={containerClass}>
			<nav className={navigationClass}>
				{tabs.map((tab) => (
					<button
						className={combineClassNames(
							tabClass,
							activeTab === tab.id && activeTabClassName,
						)}
						key={tab.id}
						onClick={handleTabClick(tab.id)}
						type="button"
					>
						{tab.label}
					</button>
				))}
			</nav>
			<div className={contentClassName}>
				{activeTabData ? activeTabData.element : <></>}
			</div>
		</div>
	);
};

export { TabContainer };
