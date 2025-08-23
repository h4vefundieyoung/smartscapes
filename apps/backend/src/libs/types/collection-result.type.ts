type CollectionResult<Item, Meta = null> = Meta extends null
	? {
			items: Item[];
		}
	: {
			items: Item[];
			meta: Meta;
		};

export { type CollectionResult };
