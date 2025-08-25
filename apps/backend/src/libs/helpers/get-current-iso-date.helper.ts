const getCurrentIsoDate = (): string => {
	return new Date().toISOString();
};

export { getCurrentIsoDate };
