import { type Entity } from "~/libs/types/types.js";

type ReviewUser = {
	avatarUrl: null | string;
	firstName: string;
	id: number;
	lastName: string;
};

class ReviewEntity implements Entity {
	private content: string;

	private id: null | number;

	private likesCount: number;

	private poiId: null | number;

	private routeId: null | number;

	private user: null | ReviewUser;

	private userId: number;

	private constructor({
		content,
		id,
		likesCount,
		poiId,
		routeId,
		user = null,
		userId,
	}: {
		content: string;
		id: null | number;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		user?: null | ReviewUser;
		userId: number;
	}) {
		this.content = content;
		this.id = id;
		this.likesCount = likesCount;
		this.poiId = poiId;
		this.routeId = routeId;
		this.userId = userId;
		this.user = user;
	}

	public static initialize(data: {
		content: string;
		createdAt: string;
		id: number;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		updatedAt: string;
		userId: number;
	}): ReviewEntity {
		return new ReviewEntity({
			content: data.content,
			id: data.id,
			likesCount: data.likesCount,
			poiId: data.poiId,
			routeId: data.routeId,
			userId: data.userId,
		});
	}

	public static initializeList(data: {
		content: string;
		id: number;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		user: ReviewUser;
		userId: number;
	}): ReviewEntity {
		return new ReviewEntity({
			content: data.content,
			id: data.id,
			likesCount: data.likesCount,
			poiId: data.poiId,
			routeId: data.routeId,
			user: data.user,
			userId: data.userId,
		});
	}

	public static initializeNew({
		content,
		likesCount = 0,
		poiId = null,
		routeId = null,
		userId,
	}: {
		content: string;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		userId: number;
	}): ReviewEntity {
		return new ReviewEntity({
			content,
			id: null,
			likesCount,
			poiId,
			routeId,
			userId,
		});
	}

	public toListObject(): {
		content: string;
		id: number;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		user: ReviewUser;
	} {
		return {
			content: this.content,
			id: this.id as number,
			likesCount: this.likesCount,
			poiId: this.poiId,
			routeId: this.routeId,
			user: this.user as ReviewUser,
		};
	}

	public toNewObject(): {
		content: string;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		userId: number;
	} {
		return {
			content: this.content,
			likesCount: this.likesCount,
			poiId: this.poiId,
			routeId: this.routeId,
			userId: this.userId,
		};
	}

	public toObject(): {
		content: string;
		id: number;
		likesCount: number;
		poiId: null | number;
		routeId: null | number;
		userId: number;
	} {
		return {
			content: this.content,
			id: this.id as number,
			likesCount: this.likesCount,
			poiId: this.poiId,
			routeId: this.routeId,
			userId: this.userId,
		};
	}
}

export { ReviewEntity };
