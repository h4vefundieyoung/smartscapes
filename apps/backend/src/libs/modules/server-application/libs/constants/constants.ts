import { APIPath, AuthApiPath } from "~/libs/enums/enums.js";

import { type WhiteRoute } from "../types/types.js";

const WHITE_ROUTES: WhiteRoute[] = [
	{
		method: "POST" as const,
		path: `${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
	},
	{
		method: "POST" as const,
		path: `${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	},
];

export { WHITE_ROUTES };
