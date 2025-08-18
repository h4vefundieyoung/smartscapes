function buildQueryParameters(
	parameters: Record<string, unknown>,
): Record<string, string> {
	const queryParameters: Record<string, string> = {};

	for (const [key, value] of Object.entries(parameters)) {
		if (value !== undefined && value !== null) {
			if (Array.isArray(value)) {
				queryParameters[key] = value.map(String).join(",");
			} else if (typeof value === "object") {
				queryParameters[key] = JSON.stringify(value);
			} else if (
				typeof value === "string" ||
				typeof value === "number" ||
				typeof value === "boolean" ||
				typeof value === "symbol" ||
				typeof value === "bigint"
			) {
				queryParameters[key] = String(value);
			}
		}
	}

	return queryParameters;
}

export { buildQueryParameters };
