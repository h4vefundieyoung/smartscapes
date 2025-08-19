const getUrlWithQueryString = (
	url: string,
	queryString?: Record<string, unknown>,
): string => {
	if (!queryString) {
		return url;
	}

	const parameters = new URLSearchParams();

	for (const [key, value] of Object.entries(queryString)) {
		if (Array.isArray(value)) {
			for (const v of value) {
				parameters.append(key, String(v));
			}
		} else {
			parameters.append(key, String(value));
		}
	}

	const query = parameters.toString();

	return `${url}?${query}`;
};

export { getUrlWithQueryString };
