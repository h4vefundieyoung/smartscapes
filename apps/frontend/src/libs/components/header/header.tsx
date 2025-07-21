import { JSX } from "react";
import styles from "./header.module.css";

type User = {
	firstName?: string;
	lastName?: string;
};

type HeaderProps = {
	user: User;
};

const Header = ({ user }: HeaderProps): JSX.Element => {
	const getInitials = (user: User | null) => {
		if (!user) {
			return "NN";
		};

		const firstInitial = user.firstName?.charAt(0).toUpperCase() ?? "";
		const lastInitial = user.lastName?.charAt(0).toUpperCase() ?? "";

		return `${firstInitial}${lastInitial}` || "NN";
	};

	const initials = getInitials(user);

	return (
		<header className={styles['header']}>
			<div className={styles['userInfo']}>
				<div className={styles['avatar']}>{initials}</div>
				<div className={styles['name']}>
					{user.firstName} {user.lastName}
				</div>
			</div>
		</header>
	);
};

export { Header };
