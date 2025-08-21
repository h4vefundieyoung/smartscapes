import { Avatar } from "~/libs/components/components.js";
import { type ReviewGetByIdResponseDto } from "~/modules/reviews/reviews.js";

import styles from "./styles.module.css";

type Properties = {
	review: ReviewGetByIdResponseDto;
};

const ReviewCard = ({ review }: Properties): React.JSX.Element => {
	const avatarUser = {
		avatarUrl: review.user.avatarUrl,
		firstName: review.user.firstName,
		id: review.user.id,
		lastName: review.user.lastName,
	};

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
