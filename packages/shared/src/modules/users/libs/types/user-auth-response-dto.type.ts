type UserAuthResponseDto = {
	email: string;
	firstName: string;
	group: {
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

export { type UserAuthResponseDto };
