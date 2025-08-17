import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	description: string;
};

const FieldError = ({ description }: Properties): React.JSX.Element => {
	return (
		<span className={styles["error"]}>
			<Icon height={24} name="error" width={24} />
			{description}
		</span>
	);
};

export { FieldError };
