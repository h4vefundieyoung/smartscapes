import { type JSX } from "react";

import { Image } from "../components.js";
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
	return (
		<div
			className={styles["avatar"]}
			style={{ "--avatar-size": `${String(size)}px` } as React.CSSProperties}
		>
			<Image
				alt="User Avatar"
				className={styles["avatar-image"] as string}
				fallback={
					<span className={styles["fallback"]}>{getUserInitials(user)}</span>
				}
				src={user.avatarUrl as string}
			/>
		</div>
	);
};

export { Avatar };
