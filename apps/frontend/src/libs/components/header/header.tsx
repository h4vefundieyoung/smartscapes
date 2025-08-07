import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { type UserAuthResponseDto, type ValueOf } from "~/libs/types/types.js";

/*
import { Button, Link } from "../components.js";
import { AuthenticatedHeader } from "./authenticated-header.js";
import { type User } from "./libs/types/types.js";
*/
import { Avatar, Button, Link } from "../components.js";

import styles from "./styles.module.css";

type Properties = {
	actions: {
		label: string;
		to: ValueOf<typeof AppRoute>;
	}[];
	user: null | UserAuthResponseDto;
};

/*
const Header = ({ user }: Properties): JSX.Element => {
*/
const Header = ({ actions, user }: Properties): JSX.Element => {
	const renderHeaderContent = (): JSX.Element => {
		if (user) {
			return (
				<div className={styles["user-info"]}>
					<Avatar user={user} />
					<div className={styles["name"]}>
						{user.firstName} {user.lastName}
					</div>
				</div>
			);
		}

		return (
			<div className={styles["buttons"]}>
				{actions.map(({ label, to }) => (
					<Button key={to} label={label} to={to} type="button" />
				))}
			</div>
		);
	};

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
<!-- 			{user ? (
				<AuthenticatedHeader user={user} />
			) : (
				<div className={styles["buttons"]}>
					<Button label="Sign up" to={AppRoute.SIGN_UP} type="button" />
					<Button label="Sign in" to={AppRoute.SIGN_IN} type="button" />
				</div>
			)} -->
       
			{renderHeaderContent()}
		</header>
	);
};

export { Header };
