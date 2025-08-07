import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { type UserAuthResponseDto, type ValueOf } from "~/libs/types/types.js";

import { Link } from "../components.js";
import { AuthenticatedHeader } from "./authenticated-header.js";
import styles from "./styles.module.css";
import { UnautharizedHeader } from "./unauthorized-header.js";

type Properties = {
	actions: {
		label: string;
		to: ValueOf<typeof AppRoute>;
	}[];
	user: null | UserAuthResponseDto;
};

const Header = ({ actions, user }: Properties): JSX.Element => {
	const renderHeaderContent = (): JSX.Element => {
		if (user) {
			return <AuthenticatedHeader user={user} />;
		}

		return <UnautharizedHeader actions={actions} />;
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
			{renderHeaderContent()}
		</header>
	);
};

export { Header };
