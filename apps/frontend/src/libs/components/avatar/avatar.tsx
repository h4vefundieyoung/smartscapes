import { type JSX } from "react";

import { Image } from "../components.js";
import { getUserInitials } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const DEFAULT_AVATAR_SIZE = 32;

type Properties = {
	size?: number;
	user: User;
};

type User = {
	avatarUrl: null | string;
	firstName: string;
	lastName: string;
};

const Avatar = ({
	size = DEFAULT_AVATAR_SIZE,
	user,
}: Properties): JSX.Element => {
	return (
		<div className={styles["avatar"]} style={{ height: size, width: size }}>
			<Image
				alt="User Avatar"
				className={styles["avatarImage"] as string}
				fallback={
					<span className={styles["fallback"]}>{getUserInitials(user)}</span>
				}
				src={user.avatarUrl as string}
			/>
		</div>
	);
};

export { Avatar };
