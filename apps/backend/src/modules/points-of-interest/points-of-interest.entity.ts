import { type Entity, type PointGeometry } from "~/libs/types/types.js";

class PointsOfInterestEntity implements Entity {
	private description: string;
	private id: null | number;
	private location: PointGeometry;
	private name: string;

	private constructor({
		description,
		id,
		location,
		name,
	}: {
		description: string;
		id: null | number;
		location: PointGeometry;
		name: string;
	}) {
		this.id = id;
		this.location = location;
		this.name = name;
		this.description = description;
	}

	public static initialize(data: {
		createdAt: string;
		description: string;
		id: number;
		location: PointGeometry;
		name: string;
		updatedAt: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
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
		description: string;
		location: PointGeometry;
		name: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			description,
			id: null,
			location,
			name,
		});
	}

	public toNewObject(): {
		description: string;
		location: PointGeometry;
		name: string;
	} {
		return {
			description: this.description,
			location: this.location,
			name: this.name,
		};
	}

	public toObject(): {
		description: string;
		id: number;
		location: PointGeometry;
		name: string;
	} {
		return {
			description: this.description,
			id: this.id as number,
			location: this.location,
			name: this.name,
		};
	}
}

export { PointsOfInterestEntity };
