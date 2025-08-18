import { FileFolderName } from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type AWSFileService } from "~/libs/modules/aws/aws.js";

import { FileEntity } from "./files.entity.js";
import { type FileRepository } from "./files.repository.js";
import { FileService } from "./files.service.js";
import { type FileMimeType } from "./libs/types/types.js";

describe("FileService", () => {
	const mockFile: Parameters<typeof FileEntity.initialize>[0] = {
		contentType: "image/jpg" as FileMimeType,
		createdAt: "2024-01-01T00:00:00Z",
		entityId: 1,
		folder: FileFolderName.AVATARS,
		id: 1,
		updatedAt: "2024-01-01T00:00:00Z",
		url: "https://example.com/file.jpg",
	};

	const createMockEntity = (): FileEntity => FileEntity.initialize(mockFile);

	it("create should return new file", async () => {
		const fileEntity = FileEntity.initialize(mockFile);

		const fileRepository = {
			create: (() => Promise.resolve(fileEntity)) as FileRepository["create"],
		} as FileRepository;

		const awsFileService = {} as AWSFileService;
		const fileService = new FileService(fileRepository, awsFileService);

		const result = await fileService.create({
			contentType: mockFile.contentType,
			entityId: mockFile.entityId,
			folder: mockFile.folder,
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
			entityId: 1,
			file: {
				file: { truncated: false },
				filename: "test.jpg",
				mimetype: "image/jpg" as FileMimeType,
				toBuffer: () => Promise.resolve(Buffer.from("test")),
			} as unknown as Parameters<typeof fileService.uploadFile>[0]["file"],
			folder: "avatars",
		});

		assert.deepStrictEqual(result, fileEntity.toObject());
	});
});
