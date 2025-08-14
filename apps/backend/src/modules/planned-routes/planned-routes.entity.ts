import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

class PlannedRoutesEntity implements Entity {
	private distance: number;
	private duration: number;
	private geometry: LineStringGeometry;
	private id: null | number;
	private userId: number;

	private constructor({
		distance,
		duration,
		geometry,
		id,
		userId,
	}: {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: null | number;
		userId: number;
	}) {
		this.id = id;
		this.userId = userId;
		this.distance = distance;
		this.duration = duration;
		this.geometry = geometry;
	}

	public static initialize(data: {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		userId: number;
	}): PlannedRoutesEntity {
		return new PlannedRoutesEntity({
			distance: data.distance,
			duration: data.duration,
			geometry: data.geometry,
			id: data.id,
			userId: data.userId,
		});
	}

	public static initializeNew({
		distance,
		duration,
		geometry,
		userId,
	}: {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		userId: number;
	}): PlannedRoutesEntity {
		return new PlannedRoutesEntity({
			distance,
			duration,
			geometry,
			id: null,
			userId,
		});
	}

	public toNewObject(): {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		userId: number;
	} {
		return {
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			userId: this.userId,
		};
	}

	public toObject(): {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		userId: number;
	} {
		return {
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			userId: this.userId,
		};
	}
}

export { PlannedRoutesEntity };
