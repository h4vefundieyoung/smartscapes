type UserPasswordDetails = {
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
	passwordHash: string;
	passwordSalt: string;
};

export { type UserPasswordDetails };
