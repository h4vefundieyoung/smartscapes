import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

import { FileEntity } from "./files.entity.js";
import { FileModel } from "./files.model.js";
import { FileRepository } from "./files.repository.js";
import { FileFolderName } from "./libs/enums/enums.js";

describe("FileRepository", () => {
	let fileRepository: FileRepository;
	let databaseTracker: Tracker;

	const mockFile: Parameters<typeof FileEntity.initialize>[0] = {
		contentType: "image/jpg",
		createdAt: "2024-01-01T00:00:00Z",
		entityId: 1,
		folder: FileFolderName.AVATARS,
		id: 1,
		updatedAt: "2024-01-01T00:00:00Z",
		url: "https://example.com/file.jpg",
	};

	const createMockEntity = (): FileEntity => FileEntity.initialize(mockFile);

	beforeEach(() => {
		const database = knex({ client: MockClient });

		databaseTracker = createTracker(database);

		FileModel.knex(database);

		fileRepository = new FileRepository(FileModel);
	});

	afterEach(() => {
		databaseTracker.reset();
	});

	it("create should create and return new file", async () => {
		const fileEntity = createMockEntity();

		databaseTracker.on.insert(DatabaseTableName.FILES).response([fileEntity]);

		const result = await fileRepository.create(fileEntity);

		assert.deepStrictEqual(result, fileEntity);
	});

	it("findAll should return all files", async () => {
		const fileEntities = [createMockEntity()];

		databaseTracker.on.select(DatabaseTableName.FILES).response(fileEntities);

		const result = await fileRepository.findAll();

		assert.deepStrictEqual(result, fileEntities);
	});
});
