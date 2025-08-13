import { type Entity, type PointGeometry } from "~/libs/types/types.js";

class PointsOfInterestEntity implements Entity {
	private createdAt: null | string;
	private id: null | number;
	private location: null | PointGeometry;
	private name: string;

	private constructor({
		createdAt,
		id,
		location,
		name,
	}: {
		createdAt: null | string;
		id: null | number;
		location: null | PointGeometry;
		name: string;
	}) {
		this.id = id;
		this.location = location;
		this.name = name;
		this.createdAt = createdAt;
	}

	public static initialize(data: {
		createdAt: string;
		id: number;
		location: PointGeometry;
		name: string;
		updatedAt: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: data.createdAt,
			id: data.id,
			location: data.location,
			name: data.name,
		});
	}

	public static initializeNew({
		location,
		name,
	}: {
		location: PointGeometry;
		name: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: null,
			id: null,
			location,
			name,
		});
	}

	public static initializeSummary(data: {
		createdAt: string;
		id: number;
		name: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: data.createdAt,
			id: data.id,
			location: null,
			name: data.name,
		});
	}

	public toNewObject(): {
		location: PointGeometry;
		name: string;
	} {
		return {
			location: this.location as PointGeometry,
			name: this.name,
		};
	}

	public toObject(): {
		id: number;
		location: PointGeometry;
		name: string;
	} {
		return {
			id: this.id as number,
			location: this.location as PointGeometry,
			name: this.name,
		};
	}

	public toSummaryObject(): {
		createdAt: string;
		id: number;
		name: string;
	} {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			name: this.name,
		};
	}
}

export { PointsOfInterestEntity };
