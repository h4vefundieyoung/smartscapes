import { Avatar } from "~/libs/components/components.js";
import { type ReviewGetByIdResponseDto } from "~/modules/reviews/reviews.js";

import styles from "./styles.module.css";

type Properties = {
	review: ReviewGetByIdResponseDto;
};

const ReviewCard = ({ review }: Properties): React.JSX.Element => {
	return (
		<li className={styles["card"]}>
			<div className={styles["head"]}>
				<Avatar size={48} user={review.user} />
				<div className={styles["username"]}>
					{review.user.firstName} {review.user.lastName}
				</div>
			</div>

			<p className={styles["content"]}>{review.content}</p>
		</li>
	);
};

export { ReviewCard };
