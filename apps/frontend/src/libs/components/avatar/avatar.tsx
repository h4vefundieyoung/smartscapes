import { type JSX } from "react";

import { type User } from "../header/libs/types/types.js";
import { getUserInitials } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const DEFAULT_AVATAR_SIZE = 32;

type Properties = {
	hidden?: boolean;
	size?: number;
	user: User;
};

const Avatar = ({
	hidden = false,
	size = DEFAULT_AVATAR_SIZE,
	user,
}: Properties): JSX.Element => {
	const { avatarUrl, firstName, lastName } = user;
	const hasAvatar = Boolean(avatarUrl);

	return (
		<div
			className={styles["avatar"]}
			style={{ "--avatar-size": `${String(size)}px` } as React.CSSProperties}
		>
			{hasAvatar && !hidden ? (
				<img
					alt="User Avatar"
					className={styles["avatar-image"]}
					src={avatarUrl as string}
				/>
			) : (
				<span className={styles["fallback"]}>
					{getUserInitials(firstName, lastName)}
				</span>
			)}
		</div>
	);
};

export { Avatar };
