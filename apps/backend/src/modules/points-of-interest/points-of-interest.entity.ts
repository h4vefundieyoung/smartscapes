import { type Entity, type PointGeometry } from "~/libs/types/types.js";

class PointsOfInterestEntity implements Entity {
	private createdAt: null | string;
	private description: null | string;
	private id: null | number;
	private location: null | PointGeometry;
	private name: string;

	private constructor({
		createdAt,
		description,
		id,
		location,
		name,
	}: {
		createdAt: null | string;
		description: null | string;
		id: null | number;
		location: null | PointGeometry;
		name: string;
	}) {
		this.id = id;
		this.location = location;
		this.name = name;
		this.createdAt = createdAt;
		this.description = description;
	}

	public static initialize(data: {
		createdAt: string;
		description: null | string;
		id: number;
		location: PointGeometry;
		name: string;
		updatedAt: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: data.createdAt,
			description: data.description,
			id: data.id,
			location: data.location,
			name: data.name,
		});
	}

	public static initializeNew({
		description,
		location,
		name,
	}: {
		description: null | string;
		location: PointGeometry;
		name: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: null,
			description,
			id: null,
			location,
			name,
		});
	}

	public toNewObject(): {
		description: null | string;
		location: PointGeometry;
		name: string;
	} {
		return {
			description: this.description,
			location: this.location as PointGeometry,
			name: this.name,
		};
	}

	public toObject(): {
		createdAt: null | string;
		description: null | string;
		id: number;
		location: PointGeometry;
		name: string;
	} {
		return {
			createdAt: this.createdAt,
			description: this.description,
			id: this.id as number,
			location: this.location as PointGeometry,
			name: this.name,
		};
	}
}

export { PointsOfInterestEntity };
