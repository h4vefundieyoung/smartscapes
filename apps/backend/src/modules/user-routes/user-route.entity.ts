import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

import { type UserRouteStatusType } from "./libs/types/type.js";

class UserRouteEntity implements Entity {
	private actualGeometry: LineStringGeometry;
	private actualPath: string;
	private completedAt: string;
	private id: null | number;
	private plannedGeometry: LineStringGeometry;
	private routeId: number;
	private startedAt: string;
	private status: UserRouteStatusType;
	private userId: number;

	private constructor({
		actualGeometry,
		actualPath,
		completedAt,
		id,
		plannedGeometry,
		routeId,
		startedAt,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		actualPath: string;
		completedAt: string;
		id: null | number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: string;
		status: UserRouteStatusType;
		userId: number;
	}) {
		this.id = id;
		this.actualGeometry = actualGeometry;
		this.actualPath = actualPath;
		this.completedAt = completedAt;
		this.plannedGeometry = plannedGeometry;
		this.routeId = routeId;
		this.startedAt = startedAt;
		this.status = status;
		this.userId = userId;
	}

	public static initialize(data: {
		actualGeometry: LineStringGeometry;
		actualPath: string;
		completedAt: string;
		id: number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: string;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry: data.actualGeometry,
			actualPath: data.actualPath,
			completedAt: data.completedAt,
			id: data.id,
			plannedGeometry: data.plannedGeometry,
			routeId: data.routeId,
			startedAt: data.startedAt,
			status: data.status,
			userId: data.userId,
		});
	}

	public static initializeNew({
		actualGeometry,
		actualPath,
		completedAt,
		plannedGeometry,
		routeId,
		startedAt,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		actualPath: string;
		completedAt: string;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: string;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry,
			actualPath,
			completedAt,
			id: null,
			plannedGeometry,
			routeId,
			startedAt,
			status,
			userId,
		});
	}

	public toNewObject(): {
		actualGeometry: LineStringGeometry;
		actualPath: string;
		completedAt: string;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: string;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			actualPath: this.actualPath,
			completedAt: this.completedAt,
			plannedGeometry: this.plannedGeometry,
			routeId: this.routeId,
			startedAt: this.startedAt,
			status: this.status,
			userId: this.userId,
		};
	}

	public toObject(): {
		actualGeometry: LineStringGeometry;
		actualPath: string;
		completedAt: string;
		id: number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: string;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			actualPath: this.actualPath,
			completedAt: this.completedAt,
			id: this.id as number,
			plannedGeometry: this.plannedGeometry,
			routeId: this.routeId,
			startedAt: this.startedAt,
			status: this.status,
			userId: this.userId,
		};
	}
}

export { UserRouteEntity };

