import { type Entity, type PointGeometry } from "~/libs/types/types.js";

import { type FileEntity } from "../files/files.entity.js";
import { RouteEntity } from "../routes/route.entity.js";
import { type RouteModel } from "../routes/route.model.js";
import { type RouteGetByIdResponseDto } from "./libs/types/types.js";

class PointsOfInterestEntity implements Entity {
	private createdAt: null | string;

	private description: null | string;

	private id: null | number;

	private location: PointGeometry;

	private name: string;

	private routes: null | RouteEntity[];

	private constructor({
		createdAt,
		description,
		id,
		location,
		name,
		routes,
	}: {
		createdAt: null | string;
		description: null | string;
		id: null | number;
		location: PointGeometry;
		name: string;
		routes: null | RouteModel[];
	}) {
		this.id = id;
		this.location = location;
		this.name = name;
		this.createdAt = createdAt;
		this.description = description;
		this.routes = routes?.map((route) => RouteEntity.initialize(route)) ?? null;
	}

	public static initialize(data: {
		createdAt: string;
		description?: null | string;
		id: number;
		location: PointGeometry;
		name: string;
		routes?: RouteModel[];
		updatedAt: string;
	}): PointsOfInterestEntity {
		return new PointsOfInterestEntity({
			createdAt: data.createdAt,
			description: data.description ?? null,
			id: data.id,
			location: data.location,
			name: data.name,
			routes: data.routes ?? null,
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
		routes: (Pick<
			RouteGetByIdResponseDto,
			"geometry" | "id" | "name" | "pois"
		> & {
			images: Pick<
				ReturnType<FileEntity["toObject"]>,
				"createdAt" | "id" | "url"
			>[];
		})[];
	} {
		return {
			description: this.description,
			id: this.id as number,
			location: this.location,
			name: this.name,
			routes: this.routes
				? this.routes.map((route) => {
						const { geometry, id, images, name, pois } = route.toObject();

						return {
							geometry,
							id,
							images: images.map(({ createdAt, id, url }) => ({
								createdAt,
								id,
								url,
							})),
							name,
							pois,
						};
					})
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
