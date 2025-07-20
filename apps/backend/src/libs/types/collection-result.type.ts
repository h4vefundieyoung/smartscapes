type CollectionResult<T, M = undefined> = (M extends undefined
	? object
	: { meta: M }) & {
	items: T[];
};

export { type CollectionResult };
