import { NavLink } from "react-router";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	to: string;
};

const Link = ({ children, to }: Properties): React.JSX.Element => (
	<NavLink className={styles["link"] as string} to={to}>
		{children}
	</NavLink>
);

export { Link };
