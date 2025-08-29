import { Activity } from "~/libs/components/activity/activity.js";
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

import { NotFound } from "../not-found/not-found.js";
import styles from "./styles.module.css";

const PublicProfile = (): React.JSX.Element => {
	const SINGLE_FOLLOWER_COUNT = 1;

	const dispatch = useAppDispatch();
	const { id } = useParams();

	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const userProfile = useAppSelector(({ users }) => users.userProfile);
	const userActivities = useAppSelector(({ users }) => users.userActivities);

	useEffect(() => {
		if (id) {
			void dispatch(usersActions.getUserPublicProfile(Number(id)));
			void dispatch(usersActions.getActivities(Number(id)));
		}
	}, [dispatch, id]);

	const handleFollowToggle = useCallback((): void => {
		if (userProfile && authenticatedUser) {
			if (userProfile.isFollowed) {
				void dispatch(
					usersActions.unfollowUser({
						followerId: authenticatedUser.id,
						userId: Number(id),
					}),
				);

				return;
			} else {
				void dispatch(
					usersActions.followUser({
						followingId: Number(id),
						userId: authenticatedUser.id,
					}),
				);

				return;
			}
		}
	}, [userProfile, authenticatedUser, dispatch, id]);

	if (
		userProfile === undefined ||
		!authenticatedUser ||
		dataStatus === DataStatus.PENDING
	) {
		return <Loader />;
	}

	if (userProfile === null) {
		return <NotFound />;
	}

	return (
		<div className={styles["container"]}>
			<main className={styles["profile-container"]}>
				<div className={styles["profile-header"]}>
					<div className={styles["user-info"]}>
						<Avatar size={128} user={userProfile} />

						<div className={styles["user-info-details"]}>
							<h1 className={styles["details-name"]}>
								{`${userProfile.firstName} ${userProfile.lastName}`}
							</h1>
							<div className={styles["details-followers"]}>
								{userProfile.followersCount.toString()} &nbsp;
								{userProfile.followersCount === SINGLE_FOLLOWER_COUNT
									? "follower"
									: "followers"}
							</div>
							<div className={styles["follow-button-container"]}>
								<Button
									label={userProfile.isFollowed ? "Unfollow" : "Follow"}
									onClick={handleFollowToggle}
									variant={userProfile.isFollowed ? "outlined" : "primary"}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles["activities-container"]}>
					<div className={styles["activities-header"]}>
						<div className={styles["activity-label"]}>
							<span>Activity</span>
						</div>
					</div>

					{userActivities.length === 0 && (
						<div className={styles["no-activities-label"]}>
							User have no activities yet.
						</div>
					)}
					{userActivities.length > 0 &&
						userActivities.map((route) => (
							<Activity
								comment={route.reviewComment}
								key={route.id}
								length={route.distance}
								routeLine={{
									geometry: route.actualGeometry,
									id: route.id.toString(),
								}}
								title={route.routeName}
							/>
						))}
				</div>
			</main>
		</div>
	);
};

export { PublicProfile };
