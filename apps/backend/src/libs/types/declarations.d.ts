import "fastify";

import { type UserAuthResponseDto } from "./types.js";

declare module "fastify" {
	interface FastifyRequest {
		token: null | string;
		user: null | UserAuthResponseDto;
	}
}
