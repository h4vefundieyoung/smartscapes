const THOUSAND = 1000;
const DECIMALS = 2;

const getFormattedLengthString = (length: number): string => {
	if (length < THOUSAND) {
		return `${length.toString()} m`;
	}

	const result = length / THOUSAND;

	return `${result.toFixed(DECIMALS).toString()} km`;
};

export { getFormattedLengthString };
