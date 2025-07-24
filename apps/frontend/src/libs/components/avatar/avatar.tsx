import { type JSX } from "react";

import { type User } from "../header/libs/types/types.js";
import { getUserInitials } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const DEFAULT_AVATAR_SIZE = 32;

type Properties = {
	size?: number;
	user: User;
};

const Avatar = ({
	size = DEFAULT_AVATAR_SIZE,
	user,
}: Properties): JSX.Element => {
	const avatarSource = user.avatarUrl?.trim() || undefined;
	const hasAvatar = Boolean(avatarSource);

	return (
		<div
			className={styles["avatar"]}
			style={{ "--avatar-size": `${String(size)}px` } as React.CSSProperties}
		>
			{hasAvatar ? (
				<img
					alt="User Avatar"
					className={styles["avatar-image"]}
					src={avatarSource}
				/>
			) : (
				<span className={styles["fallback"]}>{getUserInitials(user)}</span>
			)}
		</div>
	);
};

export { Avatar };
