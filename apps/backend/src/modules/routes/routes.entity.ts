import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

class RoutesEntity implements Entity {
	private description: string;
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
		description,
		distance,
		duration,
		geometry,
		id,
		name,
		pois,
	}: {
		description: string;
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
		this.name = name;
		this.description = description;
		this.distance = distance;
		this.duration = duration;
		this.geometry = geometry;
		this.pois = pois;
	}

	public static initialize(data: {
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
	}): RoutesEntity {
		return new RoutesEntity({
			description: data.description,
			distance: data.distance,
			duration: data.duration,
			geometry: data.geometry,
			id: data.id,
			name: data.name,
			pois: data.pois,
		});
	}

	public static initializeNew({
		description,
		distance,
		duration,
		geometry,
		name,
		pois,
	}: {
		description: string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
	}): RoutesEntity {
		return new RoutesEntity({
			description,
			distance,
			duration,
			geometry,
			id: null,
			name,
			pois,
		});
	}

	public toNewObject(): {
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
			description: this.description,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			name: this.name,
			pois: this.pois,
		};
	}

	public toObject(): {
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
			description: this.description,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			name: this.name,
			pois: this.pois,
		};
	}
}

export { RoutesEntity };
