type UserPasswordDetails = {
	group: {
		id: number;
		key: string;
		name?: string;
	};
	groupId: number;
	id: number;
	key: string;
	passwordHash: string;
	passwordSalt: string;
};

export { type UserPasswordDetails };
