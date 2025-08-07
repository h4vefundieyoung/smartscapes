type UserGetByIdItemResponseDto = {
	email: string;
	firstName: string;
	group: null | {
		id: number;
		key: string;
		name: string;
		permissions: {
			id: number;
			key: string;
			name: string;
		}[];
	};
	groupId: number;
	id: number;
	lastName: string;
};

export { type UserGetByIdItemResponseDto };
