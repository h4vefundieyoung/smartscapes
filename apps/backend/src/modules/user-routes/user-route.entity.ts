import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

import { type UserRouteStatusType } from "./libs/types/type.js";

class UserRouteEntity implements Entity {
	private actualGeometry: LineStringGeometry;

	private completedAt: null | string;

	private id: null | number;

	private plannedGeometry: LineStringGeometry;

	private routeId: number;

	private routeName: string;

	private startedAt: null | string;

	private status: null | UserRouteStatusType;

	private userId: number;

	private constructor({
		actualGeometry,
		completedAt,
		id,
		plannedGeometry,
		routeId,
		routeName,
		startedAt,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		id: null | number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		routeName: string;
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
		this.routeName = routeName;
	}

	public static initialize(data: {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		id: number;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		routeName: string;
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
			routeName: data.routeName,
			startedAt: data.startedAt,
			status: data.status,
			userId: data.userId,
		});
	}

	public static initializeNew({
		actualGeometry,
		plannedGeometry,
		routeId,
		routeName,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		routeName: string;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry,
			completedAt: null,
			id: null,
			plannedGeometry,
			routeId,
			routeName,
			startedAt: null,
			status,
			userId,
		});
	}

	public toNewObject(): {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		plannedGeometry: LineStringGeometry;
		routeId: number;
		routeName: string;
		startedAt: null | string;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			completedAt: this.completedAt,
			plannedGeometry: this.plannedGeometry,
			routeId: this.routeId,
			routeName: this.routeName,
			startedAt: this.startedAt,
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
		routeName: string;
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
			routeName: this.routeName,
			startedAt: this.startedAt,
			status: this.status as UserRouteStatusType,
			userId: this.userId,
		};
	}
}

export { UserRouteEntity };
