import {
	type FastifyInstance,
	type FastifyReply,
	type FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";

import { HTTPCode } from "~/libs/modules/http/http.js";
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
	const requestHandler = async (
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> => {
		const { headers, method, url } = request;

		try {
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
			const { userId } = await tokenService.verify<TokenPayload>(
				token as string,
			);
			const user = await userService.findById(userId);

			if (user) {
				request.user = user;
			} else {
				throw new AuthError();
			}
		} catch (error) {
			reply.status(HTTPCode.UNAUTHORIZED).send(error);
		}
	};

	app.decorate("user", null);
	app.addHook("onRequest", requestHandler);
};

const authPlugin = fastifyPlugin<PluginOptions>(auth);

export { authPlugin };
