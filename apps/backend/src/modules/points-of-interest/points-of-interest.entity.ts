import { type Entity, type PointGeometry } from "~/libs/types/types.js";

import { RouteEntity } from "../routes/route.entity.js";

class PointsOfInterestEntity implements Entity {
	private createdAt: null | string;

	private description: null | string;

	private id: null | number;

	private location: PointGeometry;

	private name: string;

	private routes: null | ReturnType<RouteEntity["toObject"]>[];

	private constructor({
		createdAt,
		description,
		id,
		location,
		name,
		routes = null,
	}: {
		createdAt: null | string;
		description: null | string;
		id: null | number;
		location: PointGeometry;
		name: string;
		routes: null | ReturnType<RouteEntity["toObject"]>[];
	}) {
		this.id = id;
		this.location = location;
		this.name = name;
		this.createdAt = createdAt;
		this.description = description;
		this.routes = routes;
	}

	public static initialize(data: {
		createdAt: string;
		description?: null | string;
		id: number;
		location: PointGeometry;
		name: string;
		routes: null | ReturnType<RouteEntity["toObject"]>[];
		updatedAt: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: data.createdAt,
			description: data.description ?? null,
			id: data.id,
			location: data.location,
			name: data.name,
			routes:
				data.routes?.map((route) =>
					RouteEntity.initialize(
						route as Parameters<typeof RouteEntity.initialize>[0],
					).toObject(),
				) ?? [],
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
			routes: null,
		});
	}

	public toDetailsObject(): {
		description: null | string;
		id: number;
		location: PointGeometry;
		name: string;
		routes: { id: number; name: string }[];
	} {
		return {
			description: this.description,
			id: this.id as number,
			location: this.location,
			name: this.name,
			routes: this.routes
				? this.routes.map(({ id, name }) => ({ id, name }))
				: [],
		};
	}

	public toListObject(): {
		createdAt: string;
		id: number;
		location: PointGeometry;
		name: string;
	} {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			location: this.location,
			name: this.name,
		};
	}

	public toNewObject(): {
		description: null | string;
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
			location: this.location,
			name: this.name,
		};
	}
}

export { PointsOfInterestEntity };
