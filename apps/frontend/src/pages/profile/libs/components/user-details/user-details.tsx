import { Avatar, Button } from "~/libs/components/components.js";

import { ProfileForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const user = {
	avatarUrl: "",
	firstName: "John",
	lastName: "Doe",
};

const UserDetails = (): React.JSX.Element => {
	return (
		<>
			<div className={styles["avatar-container"]}>
				<Avatar hidden size={120} user={user} />
				<div className={styles["button-container"]}>
					<Button label="Upload Avatar" />
					<Button label="Delete Avatar" />
				</div>
			</div>
			<ProfileForm />
		</>
	);
};

export { UserDetails };
