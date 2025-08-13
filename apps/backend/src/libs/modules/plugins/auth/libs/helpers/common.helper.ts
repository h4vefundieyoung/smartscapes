import { match } from "path-to-regexp";

const checkUrl = (path: string, url: string): boolean => {
	const matcher = match(path);

	return Boolean(matcher(url));
};

export { checkUrl };
