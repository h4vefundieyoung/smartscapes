import "fastify";
import { type UserGetAllItemResponseDto } from "@smartscapes/shared";

declare module "fastify" {
	interface FastifyRequest {
		user?: UserGetAllItemResponseDto;
	}
}
