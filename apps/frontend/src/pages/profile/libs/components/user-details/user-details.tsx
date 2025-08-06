import { Navigate } from "react-router";

import { Avatar, Button, Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	actions as userActions,
	type UserAuthResponseDto,
	type UserProfilePatchRequestDto,
} from "~/modules/users/users.js";

import { ProfileForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const UserDetails = (): null | React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { authenticatedUser } = useAppSelector((state) => state.auth);
	const isLoading = useAppSelector(
		(state) => state.users.dataStatus === DataStatus.PENDING,
	);

	const handleFormSubmit = useCallback(
		(payload: UserProfilePatchRequestDto): void => {
			if (authenticatedUser) {
				void dispatch(
					userActions.patchProfile({
						id: authenticatedUser.id.toString(),
						payload,
					}),
				);
			}
		},
		[dispatch, authenticatedUser],
	);

	const handleUpdateAvatar = useCallback(() => {}, []);

	const handleDeleteAvatar = useCallback(() => {}, []);

	if (!authenticatedUser) {
		return <Navigate to={AppRoute.SIGN_IN} />;
	}

	const user: UserAuthResponseDto & { avatarUrl?: null | string } = {
		...authenticatedUser,
		avatarUrl: null,
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles["user-details-container"]}>
			<div className={styles["user-details-avatar"]}>
				<Avatar hidden size={140} user={user} />
				<div className={styles["user-details-button-container"]}>
					<Button label="Upload Avatar" onClick={handleUpdateAvatar} />
					<Button label="Delete Avatar" onClick={handleDeleteAvatar} />
				</div>
			</div>
			<ProfileForm onSubmit={handleFormSubmit} user={authenticatedUser} />
		</div>
	);
};

export { UserDetails };
