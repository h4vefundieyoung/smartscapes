const sortByDate = <T extends Record<string, unknown>>(
	array: T[],
	field: keyof T,
): T[] => {
	return [...array].sort(
		(a, b) =>
			new Date(a[field] as string).getTime() -
			new Date(b[field] as string).getTime(),
	);
};

export { sortByDate };
