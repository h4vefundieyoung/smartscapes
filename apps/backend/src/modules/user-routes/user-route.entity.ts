import { type Entity, type LineStringGeometry } from "~/libs/types/types.js";

import { type UserRouteStatusType } from "./libs/types/type.js";

class UserRouteEntity implements Entity {
	private actualGeometry: LineStringGeometry;

	private completedAt: null | string;

	private distance: number;

	private id: null | number;

	private plannedGeometry: LineStringGeometry;

	private reviewComment: null | string;

	private routeId: number;

	private routeName: string;

	private startedAt: null | string;

	private status: null | UserRouteStatusType;

	private userId: number;

	private constructor({
		actualGeometry,
		completedAt,
		distance,
		id,
		plannedGeometry,
		reviewComment,
		routeId,
		routeName,
		startedAt,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		distance: number;
		id: null | number;
		plannedGeometry: LineStringGeometry;
		reviewComment?: null | string;
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
		this.routeName = routeName;
		this.reviewComment = reviewComment ?? null;
		this.distance = distance;
		this.startedAt = startedAt;
		this.status = status;
		this.userId = userId;
		this.routeName = routeName;
	}

	public static initialize(data: {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		distance: number;
		id: number;
		plannedGeometry: LineStringGeometry;
		reviewComment?: null | string;
		routeId: number;
		routeName: string;
		startedAt: null | string;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry: data.actualGeometry,
			completedAt: data.completedAt,
			distance: data.distance,
			id: data.id,
			plannedGeometry: data.plannedGeometry,
			reviewComment: data.reviewComment ?? null,
			routeId: data.routeId,
			routeName: data.routeName,
			startedAt: data.startedAt,
			status: data.status,
			userId: data.userId,
		});
	}

	public static initializeNew({
		actualGeometry,
		distance,
		plannedGeometry,
		reviewComment,
		routeId,
		routeName,
		status,
		userId,
	}: {
		actualGeometry: LineStringGeometry;
		distance: number;
		plannedGeometry: LineStringGeometry;
		reviewComment?: null | string;
		routeId: number;
		routeName: string;
		status: UserRouteStatusType;
		userId: number;
	}): UserRouteEntity {
		return new UserRouteEntity({
			actualGeometry,
			completedAt: null,
			distance,
			id: null,
			plannedGeometry,
			reviewComment: reviewComment ?? null,
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
		reviewComment: null | string;
		routeId: number;
		startedAt: null | string;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			completedAt: this.completedAt,
			plannedGeometry: this.plannedGeometry,
			reviewComment: this.reviewComment,
			routeId: this.routeId,
			startedAt: this.startedAt,
			status: this.status as UserRouteStatusType,
			userId: this.userId,
		};
	}

	public toObject(): {
		actualGeometry: LineStringGeometry;
		completedAt: null | string;
		distance: number;
		id: number;
		plannedGeometry: LineStringGeometry;
		reviewComment: null | string;
		routeId: number;
		routeName: string;
		startedAt: null | string;
		status: UserRouteStatusType;
		userId: number;
	} {
		return {
			actualGeometry: this.actualGeometry,
			completedAt: this.completedAt,
			distance: this.distance,
			id: this.id as number,
			plannedGeometry: this.plannedGeometry,
			reviewComment: this.reviewComment,
			routeId: this.routeId,
			routeName: this.routeName,
			startedAt: this.startedAt,
			status: this.status as UserRouteStatusType,
			userId: this.userId,
		};
	}
}

export { UserRouteEntity };
