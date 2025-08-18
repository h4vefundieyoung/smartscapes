import { Header } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useParams } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const PointOfInterestDetails = (): React.JSX.Element => {
	const { id } = useParams<{ id: string }>();

	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	const headerButtons = [{ label: "Sign in", to: AppRoute.SIGN_IN }];

	return (
		<main className={styles["container"]}>
			<Header actions={headerButtons} user={authenticatedUser} />
			<h1>Point Of Interest Details id = {id}</h1>
		</main>
	);
};

export { PointOfInterestDetails };
