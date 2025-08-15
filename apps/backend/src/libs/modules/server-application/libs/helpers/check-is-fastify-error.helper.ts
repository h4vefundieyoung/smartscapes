const checkIsFastifyError = (error: unknown): boolean => {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		"message" in error &&
		"statusCode" in error &&
		String(error.code).startsWith("FST_")
	);
};

export { checkIsFastifyError };
