import {
	CommonExceptionMessage,
	HTTPCode,
	HTTPError,
} from "@smartscapes/shared";
import {
	type FastifyInstance,
	type FastifyReply,
	type FastifyRequest,
} from "fastify";

import { type UserService } from "~/modules/users/users.js";

import { type BaseToken } from "../../token/token.js";
import { type AuthPluginApi } from "./libs/types/types.js";

type TokenPayload = {
	payload: {
		userId: number;
	};
};

class BaseAuthPlugin implements AuthPluginApi {
	private readonly jwtService: BaseToken;
	private readonly userService: UserService;
	private readonly whiteListRoutes: string[] = [];

	public constructor(jwtService: BaseToken, userService: UserService) {
		this.jwtService = jwtService;
		this.userService = userService;
		this.plugin = this.plugin.bind(this);
	}

	public addWhiteListRoutes(...routes: string[]): void {
		this.whiteListRoutes.push(...routes);
	}

	public plugin(app: FastifyInstance): void {
		app.addHook("onRequest", this.authHandler.bind(this));
	}

	private async authHandler(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> {
		const { headers, url } = request;

		if (this.whiteListRoutes.includes(url)) {
			return;
		}

		if (!headers.authorization) {
			this.sendUnathorized(reply);

			return;
		}

		try {
			const tokenIndex = 1;
			const token = headers.authorization.split(" ")[tokenIndex] as string;
			const {
				payload: { userId },
			} = await this.jwtService.verify<TokenPayload>(token);
			const user = await this.userService.find(userId);

			if (user) {
				request.user = user;
			} else {
				this.sendUnathorized(reply);
			}
		} catch {
			this.sendUnathorized(reply);
		}
	}

	private sendUnathorized(reply: FastifyReply): void {
		const { UNAUTHORIZED: status } = HTTPCode;
		const error = new HTTPError({
			message: CommonExceptionMessage.UNAUTHORIZED,
			status,
		});
		reply.status(status).send(error);
	}
}

export { BaseAuthPlugin };
