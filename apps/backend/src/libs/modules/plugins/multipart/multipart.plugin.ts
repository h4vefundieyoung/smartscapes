import fastifyMultipart from "@fastify/multipart";
import { type FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { BYTES_IN_MB } from "~/libs/constants/constants.js";

type PluginOptions = {
	MAX_FILE_SIZE_MB: number;
};

const multipart = async (
	app: FastifyInstance,
	{ MAX_FILE_SIZE_MB }: PluginOptions,
): Promise<void> => {
	const MAX_FILE_SIZE_BYTES = BYTES_IN_MB * MAX_FILE_SIZE_MB;

	await app.register(fastifyMultipart, {
		attachFieldsToBody: true,
		limits: {
			files: 1,
			fileSize: MAX_FILE_SIZE_BYTES,
		},
		throwFileSizeLimit: false,
	});
};

const multipartPlugin = fastifyPlugin(multipart);

export { multipartPlugin };
