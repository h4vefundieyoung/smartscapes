const getCssValue = (targetElement: Element, propertyName: string): string => {
	return globalThis
		.getComputedStyle(targetElement)
		.getPropertyValue(propertyName);
};

export { getCssValue };
