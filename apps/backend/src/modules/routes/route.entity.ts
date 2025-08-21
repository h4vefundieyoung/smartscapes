import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

class RouteEntity implements Entity {
	private createdByUserId: number;

	private description: null | string;

	private distance: number;

	private duration: number;

	private geometry: LineStringGeometry;

	private id: null | number;

	private name: string;

	private pois: {
		id: number;
		visitOrder: number;
	}[];

	private constructor({
		createdByUserId,
		description,
		distance,
		duration,
		geometry,
		id,
		name,
		pois,
	}: {
		createdByUserId: number;
		description: null | string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: null | number;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	}) {
		this.id = id;
		this.distance = distance;
		this.duration = duration;
		this.geometry = geometry;
		this.name = name;
		this.description = description;
		this.pois = pois;
		this.createdByUserId = createdByUserId;
	}

	public static initialize(data: {
		createdByUserId: number;
		description: string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	}): RouteEntity {
		return new RouteEntity({
			createdByUserId: data.createdByUserId,
			description: data.description,
			distance: data.distance,
			duration: data.duration,
			geometry: data.geometry,
			id: data.id,
			name: data.name,
			pois: data.pois,
		});
	}

	public static initializeList({
		createdByUserId,
		distance,
		duration,
		geometry,
		id,
		name,
		pois,
	}: {
		createdByUserId: number;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	}): RouteEntity {
		return new RouteEntity({
			createdByUserId,
			description: null,
			distance,
			duration,
			geometry,
			id,
			name,
			pois,
		});
	}

	public static initializeNew({
		createdByUserId,
		description,
		distance,
		duration,
		geometry,
		name,
		pois,
	}: {
		createdByUserId: number;
		description: string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	}): RouteEntity {
		return new RouteEntity({
			createdByUserId,
			description,
			distance,
			duration,
			geometry,
			id: null,
			name,
			pois,
		});
	}

	public toListObject(): {
		createdByUserId: number;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	} {
		return {
			createdByUserId: this.createdByUserId,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			name: this.name,
			pois: this.pois,
		};
	}

	public toNewObject(): {
		createdByUserId: number;
		description: string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	} {
		return {
			createdByUserId: this.createdByUserId,
			description: this.description as string,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			name: this.name,
			pois: this.pois,
		};
	}

	public toObject(): {
		createdByUserId: number;
		description: string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	} {
		return {
			createdByUserId: this.createdByUserId,
			description: this.description as string,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			name: this.name,
			pois: this.pois,
		};
	}
}

export { RouteEntity };
