import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type FileFolderName } from "./libs/enums/enums.js";
import { type FileMimeType } from "./libs/types/types.js";

class FileEntity implements Entity {
	private contentType: FileMimeType;
	private entityId: number;
	private folder: ValueOf<typeof FileFolderName>;
	private id: null | number;
	private url: string;

	private constructor({
		contentType,
		entityId,
		folder,
		id,
		url,
	}: {
		contentType: FileMimeType;
		entityId: number;
		folder: ValueOf<typeof FileFolderName>;
		id: null | number;
		url: string;
	}) {
		this.contentType = contentType;
		this.id = id;
		this.url = url;
		this.folder = folder;
		this.entityId = entityId;
	}

	public static initialize(data: {
		contentType: FileMimeType;
		createdAt: string;
		entityId: number;
		folder: ValueOf<typeof FileFolderName>;
		id: number;
		updatedAt: string;
		url: string;
	}): FileEntity {
		return new FileEntity({
			contentType: data.contentType,
			entityId: data.entityId,
			folder: data.folder,
			id: data.id,
			url: data.url,
		});
	}

	public static initializeNew({
		contentType,
		entityId,
		folder,
		url,
	}: {
		contentType: FileMimeType;
		entityId: number;
		folder: ValueOf<typeof FileFolderName>;
		url: string;
	}): FileEntity {
		return new FileEntity({
			contentType,
			entityId,
			folder,
			id: null,
			url,
		});
	}

	public toNewObject(): {
		contentType: FileMimeType;
		entityId: number;
		folder: ValueOf<typeof FileFolderName>;
		url: string;
	} {
		return {
			contentType: this.contentType,
			entityId: this.entityId,
			folder: this.folder,
			url: this.url,
		};
	}

	public toObject(): {
		contentType: FileMimeType;
		entityId: number;
		folder: ValueOf<typeof FileFolderName>;
		id: number;
		url: string;
	} {
		return {
			contentType: this.contentType,
			entityId: this.entityId,
			folder: this.folder,
			id: this.id as number,
			url: this.url,
		};
	}
}

export { FileEntity };
