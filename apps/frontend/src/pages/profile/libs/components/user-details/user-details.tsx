import { Avatar, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserAuthPatchRequestDto,
	type UserAuthResponseDto,
} from "~/modules/users/users.js";

import { ProfileForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const UserDetails = (): null | React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { authenticatedUser, dataPatchStatus } = useAppSelector(
		(state) => state.auth,
	) as {
		authenticatedUser: UserAuthResponseDto;
		dataPatchStatus: ValueOf<typeof DataStatus>;
	};
	const isLoading = dataPatchStatus === DataStatus.PENDING;

	const handleFormSubmit = useCallback(
		(payload: UserAuthPatchRequestDto): void => {
			void dispatch(
				authActions.authPatch({
					id: authenticatedUser.id,
					payload,
				}),
			);
		},
		[dispatch, authenticatedUser],
	);

	const user = {
		...authenticatedUser,
		avatarUrl: null,
	};

	if (isLoading) {
		return (
			<span className={styles["loader-container"]}>
				<Loader />
			</span>
		);
	}

	return (
		<div className={styles["user-details-container"]}>
			<div className={styles["user-details-avatar"]}>
				<Avatar size={140} user={user} />
			</div>
			<ProfileForm onSubmit={handleFormSubmit} user={user} />
		</div>
	);
};

export { UserDetails };
