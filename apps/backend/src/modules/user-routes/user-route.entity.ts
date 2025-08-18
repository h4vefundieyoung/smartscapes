import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

import { type UserRouteStatusType } from "./libs/types/type.js";

class UserRouteEntity implements Entity {
	private actualGeometry: LineStringGeometry;
	private completedAt: null | string;
	private id: null | number;
	private plannedGeometry: LineStringGeometry;
	private routeId: number;
	private startedAt: null | string;
	private status: null | UserRouteStatusType;
	private userId: number;

	private constructor({
		actualGeometry,
		completedAt,
		id,
		plannedGeometry,
		routeId,
		startedAt,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		id: null | number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: null | string;
		status: null | UserRouteStatusType;
		userId: number;
	}) {
		this.id = id;
		this.actualGeometry = actualGeometry;
		this.completedAt = completedAt;
		this.plannedGeometry = plannedGeometry;
		this.routeId = routeId;
		this.startedAt = startedAt;
		this.status = status;
		this.userId = userId;
	}

	public static initialize(data: {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		id: number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: null | string;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry: data.actualGeometry,
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
		plannedGeometry,
		routeId,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry,
			completedAt: null,
			id: null,
			plannedGeometry,
			routeId,
			startedAt: null,
			status,
			userId,
		});
	}

	public toNewObject(): {
		actualGeometry: LineStringGeometry;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			plannedGeometry: this.plannedGeometry,
			routeId: this.routeId,
			status: this.status as UserRouteStatusType,
			userId: this.userId,
		};
	}

	public toObject(): {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		id: number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		startedAt: null | string;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			completedAt: this.completedAt,
			id: this.id as number,
			plannedGeometry: this.plannedGeometry,
			routeId: this.routeId,
			startedAt: this.startedAt,
			status: this.status as UserRouteStatusType,
			userId: this.userId,
		};
	}
}

export { UserRouteEntity };
