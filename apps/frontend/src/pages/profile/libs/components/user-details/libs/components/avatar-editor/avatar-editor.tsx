import { Button } from "~/libs/components/button/button.js";

import styles from "./styles.module.css";

const AvatarEditor = (): React.JSX.Element => {
	return (
		<div className={styles["container"]}>
			<div className={styles["avatar-container"]}>
				<img alt="Avatar" src="https://via.placeholder.com/150" />
			</div>
			<div className={styles["button-container"]}>
				<Button label="Upload Avatar" />
				<Button label="Delete Avatar" />
			</div>
		</div>
	);
};

export { AvatarEditor };
