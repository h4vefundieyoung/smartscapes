type ReviewGetAllItemResponseDto = {
	content: string;
	id: number;
	likesCount: number;
	poiId: null | number;
	routeId: null | number;
	user: {
		avatar: null | { url?: null | string };
		firstName: string;
		id: number;
		lastName: string;
	};
};

export { type ReviewGetAllItemResponseDto };
