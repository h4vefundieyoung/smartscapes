import { type JSX } from "react";

import leafLogo from "~/assets/images/leaf.svg";
import { AppRoute } from "~/libs/enums/enums.js";

import { Button, Image, Link } from "../components.js";
import styles from "./styles.module.css";

type HeaderProperties = {
	user: null | User;
};

type User = {
	avatarUrl?: string;
	firstName: string;
	lastName: string;
};

const getInitials = (user: null | User): string => {
	const DEFAULT_INITIALS = "NN";
	const FIRST_INDEX = 0;

	if (!user) {
		return DEFAULT_INITIALS;
	}

	const firstInitial = user.firstName.charAt(FIRST_INDEX).toUpperCase();
	const lastInitial = user.lastName.charAt(FIRST_INDEX).toUpperCase();

	return firstInitial + lastInitial || DEFAULT_INITIALS;
};

const Header = ({ user }: HeaderProperties): JSX.Element => {
	return (
		<header className={styles["header"]}>
			<div className={styles["logo"]}>
				<img
					alt="SmartScapes Logo"
					className={styles["logoIcon"]}
					src={leafLogo}
				/>
				<span className={styles["logoText"]}>SmartScapes</span>
			</div>

			{user ? (
				<div className={styles["userInfo"]}>
					<div className={styles["avatar"]}>
						<Image
							alt="User Avatar"
							className={styles["avatarImage"] ?? ""}
							fallback={<span>{getInitials(user)}</span>}
							src={user.avatarUrl ?? ""}
						/>
					</div>
					<div className={styles["name"]}>
						{user.firstName} {user.lastName}
					</div>
				</div>
			) : (
				<div className={styles["buttons"]}>
					<Link to={AppRoute.SIGN_UP}>
						<Button label="Sign up" type="button" />
					</Link>
					<Link to={AppRoute.SIGN_IN}>
						<Button label="Sign in" type="button" />
					</Link>
				</div>
			)}
		</header>
	);
};

export { Header };
