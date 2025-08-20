/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Avatar, Button, Loader } from "~/libs/components/components.js";
import {
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { type UserPublicProfileResponseDto } from "~/modules/users/libs/types/types.js";
import { userApi } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const PublicProfile = (): React.JSX.Element => {
	const { id } = useParams();
	const [userProfile, setUserProfile] =
		useState<null | UserPublicProfileResponseDto>(null);

	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	useEffect(() => {
		if (id && authenticatedUser) {
			void userApi.getProfile(Number.parseInt(id)).then((resp) => {
				setUserProfile(resp.data);
			});
		}
	}, [id, authenticatedUser]);

	const handleFollowToggle = useCallback(async (): Promise<void> => {
		if (!userProfile || !authenticatedUser) {
			return;
		}

		if (userProfile.isFollowed) {
			await userApi.unfollow(userProfile.id, authenticatedUser.id);
			setUserProfile({
				...userProfile,
				followersCount: userProfile.followersCount - 1,
				isFollowed: false,
			});
		} else {
			await userApi.follow(authenticatedUser.id, {
				followingId: userProfile.id,
			});
			setUserProfile({
				...userProfile,
				followersCount: userProfile.followersCount + 1,
				isFollowed: true,
			});
		}
	}, [userProfile, authenticatedUser]);

	if (!userProfile || !authenticatedUser) {
		return <Loader />;
	}

	return (
		<div className={styles["container"]}>
			<main className={styles["profile-container"]}>
				<div className={styles["profile-header"]}>
					<div className={styles["user-info"]}>
						<Avatar size={128} user={userProfile} />

						<div className={styles["user-info-details"]}>
							<div className={styles["details-name"]}>
								{`${userProfile.firstName} ${userProfile.lastName}`}
							</div>
							<div className={styles["details-followers"]}>
								{`${userProfile.followersCount.toString()} `}
								{userProfile.followersCount === 1 ? "follower" : "followers"}
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
