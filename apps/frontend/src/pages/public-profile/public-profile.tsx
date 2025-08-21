import { Avatar, Button, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const PublicProfile = (): React.JSX.Element => {
	const ONE = 1;
	const AVATAR_SIZE = 128;
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);
	const { dataStatus, userProfile } = useAppSelector(({ users }) => users);

	useEffect(() => {
		if (id) {
			void dispatch(usersActions.getUserPublicProfile(Number(id)));
		}
	}, [dispatch, id]);

	const handleFollowToggle = useCallback(async (): Promise<void> => {
		if (!userProfile || !authenticatedUser) {
			return;
		}

		await (userProfile.isFollowed
			? dispatch(
					usersActions.unfollowUser({
						followerId: authenticatedUser.id,
						userId: Number(id),
					}),
				)
			: dispatch(
					usersActions.followUser({
						payload: {
							followingId: Number(id),
						},
						userId: authenticatedUser.id,
					}),
				));
	}, [userProfile, authenticatedUser, dispatch, id]);

	if (!userProfile || !authenticatedUser || dataStatus === DataStatus.PENDING) {
		return <Loader />;
	}

	return (
		<div className={styles["container"]}>
			<main className={styles["profile-container"]}>
				<div className={styles["profile-header"]}>
					<div className={styles["user-info"]}>
						<Avatar size={AVATAR_SIZE} user={userProfile} />

						<div className={styles["user-info-details"]}>
							<div className={styles["details-name"]}>
								{`${userProfile.firstName} ${userProfile.lastName}`}
							</div>
							<div className={styles["details-followers"]}>
								{userProfile.followersCount.toString()} &nbsp;
								{userProfile.followersCount === ONE ? "follower" : "followers"}
							</div>
							<div className={styles["follow-button-container"]}>
								<Button
									label={userProfile.isFollowed ? "Unfollow" : "Follow"}
									onClick={handleFollowToggle}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles["activities-container"]}>
					<div className={styles["activity-label"]}>
						<span>Activity</span>
					</div>
				</div>
			</main>
		</div>
	);
};

export { PublicProfile };
