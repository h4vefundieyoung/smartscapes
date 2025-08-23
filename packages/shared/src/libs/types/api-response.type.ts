type APIResponse<Data, Meta = null> = Meta extends null
	? {
			data: Data;
		}
	: {
			data: Data;
			meta: Meta;
		};

export { type APIResponse };
