import { type FastifyInstance, type FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { type HTTPMethod } from "~/libs/types/types.js";
import { userService } from "~/modules/users/users.js";

import { tokenService } from "../../token/token.js";
import { AuthError } from "./auth.exception.js";

type PluginOptions = {
	whiteRoutesList: WhiteRoute[];
};

type TokenPayload = {
	userId: number;
};

type WhiteRoute = {
	method: HTTPMethod;
	path: string;
};

const auth = (
	app: FastifyInstance,
	{ whiteRoutesList }: PluginOptions,
): void => {
	const requestHandler = async (request: FastifyRequest): Promise<void> => {
		const { headers, method, url } = request;

		const isWhiteListRoute = whiteRoutesList.some(
			({ method: _method, path }) => url.endsWith(path) && _method === method,
		);

		if (isWhiteListRoute) {
			return;
		}

		if (!headers.authorization) {
			throw new AuthError();
		}

		const [, token] = headers.authorization.split(" ");
		const { userId } = await tokenService.verify<TokenPayload>(token as string);
		const user = await userService.findById(userId);

		if (!user) {
			throw new AuthError();
		}

		request.user = user;
	};

	app.decorateRequest("user", null);
	app.addHook("onRequest", requestHandler);
};

const authPlugin = fastifyPlugin<PluginOptions>(auth);

export { authPlugin, type WhiteRoute };
