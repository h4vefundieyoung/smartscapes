import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Avatar, Button, Link } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	user: null | (UserAuthResponseDto & { avatarUrl?: null | string });
};

const Header = ({ user }: Properties): JSX.Element => {
	const hasUser = Boolean(user);

	return (
		<header className={styles["header"]}>
			<Link to={AppRoute.ROOT}>
				<img
					alt="SmartScapes Logo"
					className={styles["header-logo"]}
					height={24}
					src={appLogo}
					width={136}
				/>
			</Link>
			{hasUser ? (
				<div className={styles["user-info"]}>
					{user && <Avatar user={user} />}
					<div className={styles["name"]}>
						{user?.firstName} {user?.lastName}
					</div>
				</div>
			) : (
				<div className={styles["buttons"]}>
					<Button label="Sign up" to={AppRoute.SIGN_UP} type="button" />
					<Button label="Sign in" to={AppRoute.SIGN_IN} type="button" />
				</div>
			)}
		</header>
	);
};

export { Header };
