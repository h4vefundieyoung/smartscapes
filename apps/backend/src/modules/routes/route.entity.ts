import {
	type Entity,
	type LineStringGeometry,
	type PointGeometry,
} from "~/libs/types/types.js";

import { type CategoryEntity } from "../categories/category.entity.js";
import {
	type RouteUploadImageResponseDto,
	type UserRouteStatusType,
} from "./libs/types/types.js";

type SavedUserRoute = {
	id: number;
	status: UserRouteStatusType;
};

class RouteEntity implements Entity {
	private categories: null | ReturnType<CategoryEntity["toObject"]>[];

	private createdAt: null | string;

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
		location?: PointGeometry;
		name?: string;
		visitOrder: number;
	}[];

	private savedUserRoute: null | SavedUserRoute;

	private constructor({
		categories = [],
		createdAt,
		createdByUserId,
		description,
		distance,
		duration,
		geometry,
		id,
		images,
		name,
		pois,
		savedUserRoute,
	}: {
		categories?: ReturnType<CategoryEntity["toObject"]>[];
		createdAt: null | string;
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
			location?: PointGeometry;
			name?: string;
			visitOrder: number;
		}[];
		savedUserRoute: null | SavedUserRoute[];
	}) {
		this.categories = categories;
		this.createdAt = createdAt;
		this.id = id;
		this.distance = distance;
		this.duration = duration;
		this.geometry = geometry;
		this.name = name;
		this.description = description;
		this.pois = pois;
		this.createdByUserId = createdByUserId;
		this.savedUserRoute = savedUserRoute?.[0] ?? null;
		this.images = images;
	}

	public static initialize(data: {
		createdAt: string;
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
			location: PointGeometry;
			name: string;
			visitOrder: number;
		}[];
		savedUserRoute?: SavedUserRoute[];
	}): RouteEntity {
		return new RouteEntity({
			createdAt: data.createdAt,
			createdByUserId: data.createdByUserId,
			description: data.description,
			distance: data.distance,
			duration: data.duration,
			geometry: data.geometry,
			id: data.id,
			images: data.images,
			name: data.name,
			pois: data.pois,
			savedUserRoute: data.savedUserRoute ?? null,
		});
	}

	public static initializeList({
		createdAt,
		createdByUserId,
		distance,
		duration,
		geometry,
		id,
		images,
		name,
		pois,
	}: {
		createdAt: string;
		createdByUserId: number;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			location?: PointGeometry;
			name: string;
			visitOrder: number;
		}[];
	}): RouteEntity {
		return new RouteEntity({
			createdAt,
			createdByUserId,
			description: null,
			distance,
			duration,
			geometry,
			id,
			images,
			name,
			pois,
			savedUserRoute: null,
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
		savedUserRoute,
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
		savedUserRoute?: SavedUserRoute[];
	}): RouteEntity {
		return new RouteEntity({
			createdAt: null,
			createdByUserId,
			description,
			distance,
			duration,
			geometry,
			id: null,
			images: [],
			name,
			pois,
			savedUserRoute: savedUserRoute ?? null,
		});
	}

	public static initializeWithDetails(data: {
		categories: ReturnType<CategoryEntity["toObject"]>[];
		createdByUserId: number;
		description: string;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			location: PointGeometry;
			name: string;
			visitOrder: number;
		}[];
		savedUserRoute?: SavedUserRoute[];
	}): RouteEntity {
		return new RouteEntity({
			categories: data.categories,
			createdAt: null,
			createdByUserId: data.createdByUserId,
			description: data.description,
			distance: data.distance,
			duration: data.duration,
			geometry: data.geometry,
			id: data.id,
			images: data.images,
			name: data.name,
			pois: data.pois,
			savedUserRoute: null,
		});
	}

	public toDetailsObject(): {
		categories: ReturnType<CategoryEntity["toObject"]>[];
		createdAt: string;
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
			location: PointGeometry;
			name: string;
			visitOrder: number;
		}[];
		savedUserRoute: null | SavedUserRoute;
	} {
		return {
			categories: this.categories as ReturnType<CategoryEntity["toObject"]>[],
			createdAt: this.createdAt as string,
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
				location: PointGeometry;
				name: string;
				visitOrder: number;
			}[],
			savedUserRoute: this.savedUserRoute,
		};
	}

	public toListObject(): {
		createdAt: string;
		createdByUserId: number;
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
		id: number;
		images: RouteUploadImageResponseDto[];
		name: string;
		pois: {
			id: number;
			location: PointGeometry;
			name: string;
			visitOrder: number;
		}[];
	} {
		return {
			createdAt: this.createdAt as string,
			createdByUserId: this.createdByUserId,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			images: this.images,
			name: this.name,
			pois: this.pois as {
				id: number;
				location: PointGeometry;
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
		categories: ReturnType<CategoryEntity["toObject"]>[];
		createdAt: string;
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
			location: PointGeometry;
			name: string;
			visitOrder: number;
		}[];
	} {
		return {
			categories: this.categories as ReturnType<CategoryEntity["toObject"]>[],
			createdAt: this.createdAt as string,
			createdByUserId: this.createdByUserId,
			description: this.description,
			distance: this.distance,
			duration: this.duration,
			geometry: this.geometry,
			id: this.id as number,
			images: this.images,
			name: this.name,
			pois: this.pois as Required<
				Pick<
					RouteEntity["pois"][number],
					"id" | "location" | "name" | "visitOrder"
				>
			>[],
		};
	}
}

export { RouteEntity };
