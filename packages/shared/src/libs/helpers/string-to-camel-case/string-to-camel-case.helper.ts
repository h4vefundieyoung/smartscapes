const stringToCamelCase = (string_: string): string => {
	return string_
		.replaceAll(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replaceAll(/\s+/g, "");
};

export { stringToCamelCase };
