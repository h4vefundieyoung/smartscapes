import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	description: string;
};

const FieldError = ({ description }: Properties): React.JSX.Element => {
	return (
		<span className={styles["error"]}>
			<span className={styles["icon"]}>
				<Icon height={20} name="error" width={20} />
			</span>
			{description}
		</span>
	);
};

export { FieldError };
