import fastifyMultipart, { type MultipartFile } from "@fastify/multipart";
import { FileContent } from "@smartscapes/shared/src/modules/files/libs/enums/file-content.enum.js";
import { type FastifyInstance, type FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { FILE_SIZE_MB } from "~/libs/constants/constants.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { FilesExceptionMessage } from "~/modules/files/libs/enums/files-exeption-message.enum.js";
import { FilesError } from "~/modules/files/libs/exeptions/files.exeption.js";

type PluginOptions = {
	maxFileSizeMB: number;
};

const multipart = async (
	app: FastifyInstance,
	{ maxFileSizeMB }: PluginOptions,
): Promise<void> => {
	const ALLOWED_FILE_TYPES = Object.values(FileContent) as readonly string[];

	await app.register(fastifyMultipart, {
		limits: {
			files: 1,
			fileSize: FILE_SIZE_MB * maxFileSizeMB,
		},
	});

	const requestHandler = async (
		request: FastifyRequest<{ Body: MultipartFile }>,
	): Promise<void> => {
		if (!request.isMultipart()) {
			// eslint-disable-next-line no-console
			console.log("Not multipart, returning");

			return;
		}

		const file = await request.file();
		// eslint-disable-next-line no-console
		console.log("file:", file);

		if (!file) {
			throw new FilesError({
				message: FilesExceptionMessage.FILE_REQUIRED,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const isTooLarge = file.file.bytesRead > maxFileSizeMB * FILE_SIZE_MB;
		const isInvalidType = !ALLOWED_FILE_TYPES.includes(file.mimetype);

		if (isTooLarge) {
			throw new FilesError({
				message: FilesExceptionMessage.FILE_SIZE_EXCEEDS_LIMIT,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		if (isInvalidType) {
			throw new FilesError({
				message: FilesExceptionMessage.INVALID_FILE_TYPE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		request.body = file;
	};

	app.addHook("preHandler", requestHandler);
};

const multipartPlugin = fastifyPlugin<PluginOptions>(multipart);

export { multipartPlugin, type PluginOptions };
