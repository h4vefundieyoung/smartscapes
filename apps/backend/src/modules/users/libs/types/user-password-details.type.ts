type UserPasswordDetails = {
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
	passwordHash: string;
	passwordSalt: string;
};

export { type UserPasswordDetails };
