import { HTTPCode } from "@smartscapes/shared";
import {
	type FastifyInstance,
	type FastifyReply,
	type FastifyRequest,
} from "fastify";

import { type UserService } from "~/modules/users/users.js";

import { type Plugin } from "../libs/types/types.js";

class AuthPlugin implements Plugin {
	private jwtService: unknown;
	private readonly userService: UserService;
	private readonly whiteListRoutes: string[] = [];

	public constructor(jwtService: unknown, userService: UserService) {
		this.userService = userService;
		this.plugin = this.plugin.bind(this);
	}

	public addWhiteListRoutes(...routes: string[]): void {
		this.whiteListRoutes.push(...routes);
	}

	public plugin(app: FastifyInstance): void {
		app.addHook("onRequest", this.authHandler.bind(this));
	}

	private authHandler(request: FastifyRequest, reply: FastifyReply): void {
		const { headers, url } = request;

		if (this.whiteListRoutes.includes(url)) {
			return;
		}

		if (!headers.authorization) {
			reply.status(HTTPCode.UNAUTHORIZED).send();
		}
	}
}

export { AuthPlugin };
