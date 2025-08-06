import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

const useNavigationTab = (
	defaultTabId: string,
): {
	activeTabId: string;
	setTabInUrl: (tabId: string) => void;
} => {
	const getTabFromUrl = (): string => {
		const searchParameters = new URLSearchParams(globalThis.location.search);

		return searchParameters.get("tab") ?? defaultTabId;
	};

	const [activeTabId, setActiveTabId] = useState<string>(getTabFromUrl);

	const setTabInUrl = useCallback((tabId: string) => {
		const url = new URL(globalThis.location.href);
		url.searchParams.set("tab", tabId);
		globalThis.history.pushState({}, "", url);
		setActiveTabId(tabId);
	}, []);

	useEffect(() => {
		const currentTab = getTabFromUrl();

		if (
			currentTab === defaultTabId &&
			!globalThis.location.search.includes("tab=")
		) {
			setTabInUrl(defaultTabId);
		}
	}, [defaultTabId, setTabInUrl]);

	useEffect(() => {
		const handlePopState = (): void => {
			setActiveTabId(getTabFromUrl());
		};

		globalThis.addEventListener("popstate", handlePopState);

		return (): void => {
			globalThis.removeEventListener("popstate", handlePopState);
		};
	}, []);

	return { activeTabId, setTabInUrl };
};

export { useNavigationTab };
