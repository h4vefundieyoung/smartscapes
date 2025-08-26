import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

import {
	type RouteUploadImageResponseDto,
	type UserRoute,
} from "./libs/types/types.js";

class RouteEntity implements Entity {
	private createdByUserId: number;

	private description: null | string;

	private distance: number;

	private duration: number;

	private geometry: LineStringGeometry;

	private id: null | number;

	private images: RouteUploadImageResponseDto[];

	private name: string;

	private pois: {
		id: number;
		name?: string;
		visitOrder: number;
	}[];

	private userRoute: null | UserRoute;

	private constructor({
		createdByUserId,
		description,
		distance,
		duration,
		geometry,
		id,
		images,
		name,
		pois,
		userRoute,
	}: {
		createdByUserId: number;
		description: null | string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: null | number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			name?: string;
			visitOrder: number;
		}[];
		userRoute: null | UserRoute[];
	}) {
		this.id = id;
		this.distance = distance;
		this.duration = duration;
		this.geometry = geometry;
		this.name = name;
		this.description = description;
		this.pois = pois;
		this.createdByUserId = createdByUserId;
		this.userRoute = userRoute?.[0] ?? null;
		this.images = images;
	}

	public static initialize(data: {
		createdByUserId: number;
		description: null | string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			name: string;
			visitOrder: number;
		}[];
		userRoute?: UserRoute[];
	}): RouteEntity {
		return new RouteEntity({
			createdByUserId: data.createdByUserId,
			description: data.description,
			distance: data.distance,
			duration: data.duration,
			geometry: data.geometry,
			id: data.id,
			images: data.images,
			name: data.name,
			pois: data.pois,
			userRoute: data.userRoute ?? null,
		});
	}

	public static initializeList({
		createdByUserId,
		distance,
		duration,
		geometry,
		id,
		images,
		name,
		pois,
	}: {
		createdByUserId: number;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			name: string;
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
			images,
			name,
			pois,
			userRoute: null,
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
		userRoute,
	}: {
		createdByUserId: number;
		description: null | string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		name: string;
		pois: {
			id: number;
			visitOrder: number;
		}[];
		userRoute?: UserRoute[];
	}): RouteEntity {
		return new RouteEntity({
			createdByUserId,
			description,
			distance,
			duration,
			geometry,
			id: null,
			images: [],
			name,
			pois,
			userRoute: userRoute ?? null,
		});
	}

	public toDetailsObject(): {
		createdByUserId: number;
		description: null | string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			name: string;
			visitOrder: number;
		}[];
		userRoute: null | UserRoute;
	} {
		return {
			createdByUserId: this.createdByUserId,
			description: this.description,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			images: this.images,
			name: this.name,
			pois: this.pois as {
				id: number;
				name: string;
				visitOrder: number;
			}[],
			userRoute: this.userRoute,
		};
	}

	public toListObject(): {
		createdByUserId: number;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			name: string;
			visitOrder: number;
		}[];
	} {
		return {
			createdByUserId: this.createdByUserId,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			images: this.images,
			name: this.name,
			pois: this.pois as {
				id: number;
				name: string;
				visitOrder: number;
			}[],
		};
	}

	public toNewObject(): {
		createdByUserId: number;
		description: null | string;
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
			description: this.description,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			name: this.name,
			pois: this.pois,
		};
	}

	public toObject(): {
		createdByUserId: number;
		description: null | string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			name: string;
			visitOrder: number;
		}[];
	} {
		return {
			createdByUserId: this.createdByUserId,
			description: this.description,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			images: this.images,
			name: this.name,
			pois: this.pois as Required<
				Pick<RouteEntity["pois"][number], "id" | "name" | "visitOrder">
			>[],
		};
	}
}

export { RouteEntity };
