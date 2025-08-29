import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { FilesController } from "./files.controller.js";
import { type FileService } from "./files.service.js";
import { FileFolderName } from "./libs/enums/enums.js";
import { type FileMimeType } from "./libs/types/types.js";

describe("FilesController", () => {
	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	const mockFile = {
		contentType: "image/jpg" as FileMimeType,
		createdAt: "2024-01-01T00:00:00Z",
		id: 1,
		url: "https://example.com/file.jpg",
	};

	it("getAll should return all files", async () => {
		const files = [mockFile];

		const mockGetAll: FileService["getAll"] = () => {
			return Promise.resolve(files);
		};

		const fileService = {
			getAll: mockGetAll,
		} as FileService;

		const filesController = new FilesController(mockLogger, fileService);

		const result = await filesController.getAll();

		assert.deepStrictEqual(result, {
			payload: {
				data: files,
			},
			status: HTTPCode.OK,
		});
	});

	it("uploadFile should return uploaded file", async () => {
		const mockUploadFile: FileService["uploadFile"] = () => {
			return Promise.resolve(mockFile);
		};

		const fileService = {
			uploadFile: mockUploadFile,
		} as FileService;

		const filesController = new FilesController(mockLogger, fileService);

		const result = await filesController.uploadFile({
			body: {} as unknown as Parameters<
				typeof filesController.uploadFile
			>[0]["body"],
			params: { entityId: 1, folder: FileFolderName.AVATARS },
			query: {},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: mockFile,
			},
			status: HTTPCode.CREATED,
		});
	});
});
