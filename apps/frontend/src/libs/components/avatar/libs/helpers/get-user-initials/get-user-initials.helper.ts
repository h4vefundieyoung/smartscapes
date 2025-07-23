type User = {
	firstName: string;
	lastName: string;
};

const getUserInitials = (user: User): string => {
	const [firstChar] = user.firstName;
	const [lastChar] = user.lastName;

	const firstNameInitial = firstChar ? firstChar.toUpperCase() : "";
	const lastNameInitial = lastChar ? lastChar.toUpperCase() : "";

	return `${firstNameInitial}${lastNameInitial}`;
};

export { getUserInitials };
