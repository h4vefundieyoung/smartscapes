import { combineClassNames, getUserInitials } from "~/libs/helpers/helpers.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const DEFAULT_AVATAR_SIZE = 32;

type Properties = {
	size?: number;
	theme?: "dark" | "light";
	user: Pick<UserAuthResponseDto, "avatarUrl" | "firstName" | "lastName">;
};

const FONT_SIZE_RATIO = 3;

const Avatar = ({
	size = DEFAULT_AVATAR_SIZE,
	theme = "dark",
	user,
}: Properties): React.JSX.Element => {
	const { avatarUrl, firstName, lastName } = user;
	const hasAvatar = Boolean(avatarUrl);
	const fontSize = Math.floor(size / FONT_SIZE_RATIO);

	return (
		<div
			className={styles["avatar"]}
			style={
				{
					"--avatar-size": `${String(size)}px`,
					"--font-size": `${String(fontSize)}px`,
				} as React.CSSProperties
			}
		>
			{hasAvatar ? (
				<img
					alt="User Avatar"
					className={styles["avatar-image"]}
					src={avatarUrl as string}
				/>
			) : (
				<span className={combineClassNames(styles["fallback"], styles[theme])}>
					{getUserInitials(firstName, lastName)}
				</span>
			)}
		</div>
	);
};

export { Avatar };
