import { type Entity } from "~/libs/types/types.js";

import { type FileMimeType } from "./libs/types/types.js";

class FileEntity implements Entity {
	private contentType: FileMimeType;

	private id: null | number;

	private url: string;

	private constructor({
		contentType,
		id,
		url,
	}: {
		contentType: FileMimeType;
		id: null | number;
		url: string;
	}) {
		this.contentType = contentType;
		this.id = id;
		this.url = url;
	}

	public static initialize(data: {
		contentType: FileMimeType;
		createdAt: string;
		id: number;
		updatedAt: string;
		url: string;
	}): FileEntity {
		return new FileEntity({
			contentType: data.contentType,
			id: data.id,
			url: data.url,
		});
	}

	public static initializeNew({
		contentType,
		url,
	}: {
		contentType: FileMimeType;
		url: string;
	}): FileEntity {
		return new FileEntity({
			contentType,
			id: null,
			url,
		});
	}

	public toNewObject(): {
		contentType: FileMimeType;
		url: string;
	} {
		return {
			contentType: this.contentType,
			url: this.url,
		};
	}

	public toObject(): {
		contentType: FileMimeType;
		id: number;
		url: string;
	} {
		return {
			contentType: this.contentType,
			id: this.id as number,
			url: this.url,
		};
	}
}

export { FileEntity };
