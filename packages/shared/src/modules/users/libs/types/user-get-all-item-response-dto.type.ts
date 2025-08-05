type UserGetByIdItemResponseDto = {
	email: string;
	firstName: string;
	group?: {
		id: number;
		key: string;
		name: string;
		permissions: {
			id: number;
			key: string;
			name: string;
		}[];
	};
	groupId: null | number;
	id: number;
	lastName: string;
};

export { type UserGetByIdItemResponseDto };
