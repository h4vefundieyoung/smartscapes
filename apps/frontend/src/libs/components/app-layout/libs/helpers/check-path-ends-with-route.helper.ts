const checkPathEndsWithRoute = (routes: string[], path: string): boolean => {
	return routes.some((route) => path.endsWith(route));
};

export { checkPathEndsWithRoute };
