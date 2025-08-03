type Tab = {
	element: React.JSX.Element;
	id: string;
	label: string;
};

type TabContainerProperties = {
	activeTabClassName?: string | undefined;
	containerClassName?: string | undefined;
	contentClassName?: string | undefined;
	defaultTabId?: string | undefined;
	navigationClassName?: string | undefined;
	tabClassName?: string | undefined;
	tabs: Tab[];
};

export { type TabContainerProperties };
