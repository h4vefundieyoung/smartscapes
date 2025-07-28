import { APIPath, AuthApiPath } from "~/libs/enums/enums.js";

const WHITE_ROUTES = [
	{
		method: "POST" as const,
		path: APIPath.AUTH + AuthApiPath.SIGN_IN,
	},
	{
		method: "POST" as const,
		path: APIPath.AUTH + AuthApiPath.SIGN_UP,
	},
];

export { WHITE_ROUTES };
