const getUserInitials = (firstName?: string, lastName?: string): string => {
	const firstNameInitial = firstName?.charAt(0).toUpperCase() ?? "";
	const lastNameInitial = lastName?.charAt(0).toUpperCase() ?? "";

	return `${firstNameInitial}${lastNameInitial}`;
};

export { getUserInitials };
