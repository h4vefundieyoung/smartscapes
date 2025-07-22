import { type Entity } from "~/libs/types/types.js";

class PointsOfInterestEntity implements Entity {
	private id: null | number;
	private latitude: number;
	private longitude: number;
	private name: string;

	private constructor({
		id,
		latitude,
		longitude,
		name,
	}: {
		id: null | number;
		latitude: number;
		longitude: number;
		name: string;
	}) {
		this.id = id;
		this.latitude = latitude;
		this.longitude = longitude;
		this.name = name;
	}

	public static initialize(data: {
		createdAt: string;
		id: number;
		latitude: number;
		longitude: number;
		name: string;
		updatedAt: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			id: data.id,
			latitude: data.latitude,
			longitude: data.longitude,
			name: data.name,
		});
	}

	public static initializeNew({
		latitude,
		longitude,
		name,
	}: {
		latitude: number;
		longitude: number;
		name: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			id: null,
			latitude,
			longitude,
			name,
		});
	}

	public toNewObject(): {
		latitude: number;
		longitude: number;
		name: string;
	} {
		return {
			latitude: this.latitude,
			longitude: this.longitude,
			name: this.name,
		};
	}

	public toObject(): {
		id: number;
		latitude: number;
		longitude: number;
		name: string;
	} {
		return {
			id: this.id as number,
			latitude: this.latitude,
			longitude: this.longitude,
			name: this.name,
		};
	}
}

export { PointsOfInterestEntity };
