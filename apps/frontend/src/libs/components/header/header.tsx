import { type JSX } from "react";

import styles from "./styles.module.css";

type HeaderProperties = {
	user: User;
};

type User = {
	firstName?: string;
	lastName?: string;
};

const getInitials = (user: null | User): string => {
	const DEFAULT_INITIALS = "NN";
	const FIRST_INDEX = 0;

	if (!user) {
		return DEFAULT_INITIALS;
	}

	const firstInitial = user.firstName?.charAt(FIRST_INDEX).toUpperCase() ?? "";
	const lastInitial = user.lastName?.charAt(FIRST_INDEX).toUpperCase() ?? "";

	return `${firstInitial}${lastInitial}` || DEFAULT_INITIALS;
};

const Header = ({ user }: HeaderProperties): JSX.Element => {
	const initials = getInitials(user);

	return (
		<header className={styles["header"]}>
			<div className={styles["userInfo"]}>
				<div className={styles["avatar"]}>{initials}</div>
				<div className={styles["name"]}>
					{user.firstName} {user.lastName}
				</div>
			</div>
		</header>
	);
};

export { Header };
