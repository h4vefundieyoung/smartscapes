import { type Entity } from "~/libs/types/types.js";

class CategoryEntity implements Entity {
	private createdAt: null | string;

	private id: null | number;

	private key: string;

	private name: string;

	private constructor({
		createdAt,
		id,
		key,
		name,
	}: {
		createdAt: null | string;
		id: null | number;
		key: string;
		name: string;
	}) {
		this.id = id;
		this.key = key;
		this.name = name;
		this.createdAt = createdAt;
	}

	public static initialize({
		createdAt,
		id,
		key,
		name,
	}: {
		createdAt: string;
		id: number;
		key: string;
		name: string;
	}): CategoryEntity {
		return new CategoryEntity({ createdAt, id, key, name });
	}

	public static initializeNew({
		key,
		name,
	}: {
		key: string;
		name: string;
	}): CategoryEntity {
		return new CategoryEntity({ createdAt: null, id: null, key, name });
	}

	public toNewObject(): {
		key: string;
		name: string;
	} {
		return {
			key: this.key,
			name: this.name,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		key: string;
		name: string;
	} {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			key: this.key,
			name: this.name,
		};
	}
}

export { CategoryEntity };
