import { type FastifyPluginAsync, type FastifyPluginCallback } from "fastify";

interface Plugin {
	plugin: FastifyPluginAsync | FastifyPluginCallback;
}

export { type Plugin };
