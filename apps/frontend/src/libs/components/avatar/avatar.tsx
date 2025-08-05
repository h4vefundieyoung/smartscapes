import { type UserAuthResponseDto } from "@smartscapes/shared";

import { getUserInitials } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const DEFAULT_AVATAR_SIZE = 32;

type Properties = {
	avatarUrl?: string;
	size?: number;
	user: UserAuthResponseDto;
};

const Avatar = ({
	avatarUrl,
	size = DEFAULT_AVATAR_SIZE,
	user,
}: Properties): React.JSX.Element => {
	const { firstName, lastName } = user;
	const hasAvatar = Boolean(avatarUrl);

	return (
		<div
			className={styles["avatar"]}
			style={{ "--avatar-size": `${String(size)}px` } as React.CSSProperties}
		>
			{hasAvatar ? (
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
