import { APIPath, AuthApiPath } from "~/libs/enums/enums.js";

import { type WhiteRoute } from "../types/types.js";

const WHITE_ROUTES: WhiteRoute[][] = [
	[
		{
			method: "POST",
			path: `${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
		},
		{
			method: "POST",
			path: `${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
		},
		{
			method: "GET",
			path: "/documentation/*",
		},
	],
];

export { WHITE_ROUTES };
