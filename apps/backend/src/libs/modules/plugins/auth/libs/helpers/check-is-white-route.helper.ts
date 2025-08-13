import { type HTTPMethod } from "~/libs/types/types.js";

import { type WhiteRoute } from "../../auth.plugin.js";
import { checkMatchUrlPattern } from "./common.helper.js";

type CheckIsWhiteRouteParameters = {
	method: HTTPMethod;
	url: string;
	whiteRoutes: WhiteRoute[];
};

const checkIsWhiteRoute = ({
	method,
	url,
	whiteRoutes,
}: CheckIsWhiteRouteParameters): boolean => {
	const apiUrlRegex = /^\/api\/v\d+(\/.+)$/;
	const match = url.match(apiUrlRegex);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	return whiteRoutes.some(({ method: _method, path }) => {
		if (_method !== method) {
			return false;
		}

		return checkMatchUrlPattern(path, url);
	});
};

export { checkIsWhiteRoute };
