import { Avatar } from "~/libs/components/components.js";
import { type ReviewGetByIdResponseDto } from "~/modules/reviews/reviews.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	review: ReviewGetByIdResponseDto;
};

const ReviewCard = ({ review }: Properties): React.JSX.Element => {
	const avatarUser = {
		avatarUrl: null,
		email: "",
		firstName: review.user.firstName,
		group: {
			id: 0,
			key: "users",
			name: "Users",
			permissions: [],
		},
		groupId: 0,
		id: review.user.id,
		isVisibleProfile: true,

		lastName: review.user.lastName,
	} satisfies UserAuthResponseDto & { avatarUrl?: null | string };

	return (
		<li className={styles["card"]}>
			<div className={styles["head"]}>
				<Avatar size={48} user={avatarUser} />
				<div className={styles["username"]}>
					{review.user.firstName} {review.user.lastName}
				</div>
			</div>

			<p className={styles["content"]}>{review.content}</p>
		</li>
	);
};

export { ReviewCard };
