import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type AWSFileService } from "~/libs/modules/aws/aws.js";

import { FilesEntity } from "./files.entity.js";
import { type FileRepository } from "./files.repository.js";
import { FileService } from "./files.service.js";
import { type FileMimeType } from "./libs/types/types.js";

describe("FileService", () => {
	const mockFile: Parameters<typeof FilesEntity.initialize>[0] = {
		contentType: "image/jpg" as FileMimeType,
		createdAt: "2024-01-01T00:00:00Z",
		id: 1,
		updatedAt: "2024-01-01T00:00:00Z",
		url: "https://example.com/file.jpg",
	};

	const createMockEntity = (): FilesEntity => FilesEntity.initialize(mockFile);

	it("create should return new file", async () => {
		const fileEntity = FilesEntity.initialize(mockFile);

		const fileRepository = {
			create: (() => Promise.resolve(fileEntity)) as FileRepository["create"],
		} as FileRepository;

		const awsFileService = {} as AWSFileService;
		const fileService = new FileService(fileRepository, awsFileService);

		const result = await fileService.create({
			contentType: mockFile.contentType,
			url: mockFile.url,
		});

		assert.deepStrictEqual(result, {
			contentType: mockFile.contentType,
			id: mockFile.id,
			url: mockFile.url,
		});
	});

	it("getAll should return all files", async () => {
		const fileEntity = createMockEntity();

		const fileRepository = {
			findAll: () => Promise.resolve([fileEntity]),
		} as unknown as FileRepository;

		const awsFileService = {} as AWSFileService;
		const fileService = new FileService(fileRepository, awsFileService);

		const result = await fileService.getAll();

		assert.deepStrictEqual(result, [fileEntity.toObject()]);
	});

	it("uploadFile should return uploaded file", async () => {
		const fileEntity = createMockEntity();

		const fileRepository = {
			create: (() => Promise.resolve(fileEntity)) as FileRepository["create"],
		} as FileRepository;

		const awsFileService = {
			uploadFile: () => Promise.resolve(mockFile.url),
		} as unknown as AWSFileService;

		const fileService = new FileService(fileRepository, awsFileService);

		const result = await fileService.uploadFile({
			file: {
				filename: "test.jpg",
				mimetype: "image/jpg" as FileMimeType,
				toBuffer: () => Promise.resolve(Buffer.from("test")),
			} as unknown as Parameters<typeof fileService.uploadFile>[0]["file"],
			folder: "avatars",
		});

		assert.deepStrictEqual(result, fileEntity.toObject());
	});
});
