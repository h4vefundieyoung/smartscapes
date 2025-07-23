import { type JSX } from "react";

import { Image } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	user: User;
};

type User = {
	avatarUrl: null | string;
	firstName: string;
	lastName: string;
};

const getInitials = (user: User): string => {
	const [firstChar] = user.firstName;
	const [lastChar] = user.lastName;

	const firstNameInitial = firstChar ? firstChar.toUpperCase() : "";
	const lastNameInitial = lastChar ? lastChar.toUpperCase() : "";

	return `${firstNameInitial}${lastNameInitial}`;
};

const Avatar = ({ user }: Properties): JSX.Element => {
	return (
		<div className={styles["avatar"]}>
			<Image
				alt="User Avatar"
				className={styles["avatarImage"] ?? ""}
				fallback={
					<span className={styles["fallback"]}>{getInitials(user)}</span>
				}
				src={user.avatarUrl ?? ""}
			/>
		</div>
	);
};

export { Avatar };
