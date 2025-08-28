import { Avatar, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type ReviewGetByIdResponseDto } from "~/modules/reviews/reviews.js";

import styles from "./styles.module.css";

type Properties = {
	review: ReviewGetByIdResponseDto;
};

const ReviewCard = ({ review }: Properties): React.JSX.Element => {
	const userProfileLink = configureString(AppRoute.PUBLIC_PROFILE_$ID, {
		id: review.user.id.toString(),
	});

	return (
		<li className={styles["card"]}>
			<Link className={styles["link"]} to={userProfileLink}>
				<Avatar size={48} user={review.user} />
				<div className={styles["username"]}>
					{review.user.firstName} {review.user.lastName}
				</div>
			</Link>

			<p className={styles["content"]}>{review.content}</p>
		</li>
	);
};

export { ReviewCard };
