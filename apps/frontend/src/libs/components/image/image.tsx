import { type JSX, useCallback } from "react";
import { useState } from "react";

type Properties = {
	alt: string;
	className?: string;
	fallback: JSX.Element;
	src?: string;
};

const Image = ({
	alt,
	className = "",
	fallback,
	src,
}: Properties): JSX.Element => {
	const [hasError, setHasError] = useState<boolean>(false);

	const handleError = useCallback(() => {
		setHasError(true);
	}, []);

	if (!src || hasError) {
		return fallback;
	}

	return (
		<img alt={alt} className={className} onError={handleError} src={src} />
	);
};

export { Image };
