import { NavLink } from "react-router";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	to: string;
};

const TextLink = ({ children, to }: Properties): React.JSX.Element => (
	<NavLink className={styles["link"] as string} to={to}>
		{children}
	</NavLink>
);

export { TextLink };
