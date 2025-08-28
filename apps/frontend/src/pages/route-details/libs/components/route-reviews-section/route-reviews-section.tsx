import { useCallback, useState } from "react";

import {
	Button,
	CreateReviewModal,
	ReviewCard,
} from "~/libs/components/components.js";
import {
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
} from "~/modules/reviews/reviews.js";

import styles from "./styles.module.css";

type Properties = {
	isAuthenticatedUser: boolean;
	items: ReviewGetByIdResponseDto[];
	onCreate: (payload: ReviewRequestDto) => void;
	routeId: number;
};

const RouteReviewsSection = ({
	isAuthenticatedUser,
	items,
	onCreate,
	routeId,
}: Properties): React.JSX.Element => {
	const [isCreateReviewOpen, setIsCreateReviewOpen] = useState<boolean>(false);
	const hasReviews = items.length > 0;

	const handleModalToggle = useCallback(() => {
		setIsCreateReviewOpen((previous) => !previous);
	}, []);

	const handleCreate = useCallback(
		(payload: ReviewRequestDto): void => {
			onCreate(payload);
			setIsCreateReviewOpen(false);
		},
		[onCreate],
	);

	return (
		<section className={styles["section"]}>
			<div className={styles["header"]}>
				<h2 className={styles["title"]}>Reviews</h2>
				{isAuthenticatedUser && (
					<div>
						<Button label="Leave review" onClick={handleModalToggle} />
					</div>
				)}
			</div>
			{hasReviews && (
				<ul className={styles["list"]}>
					{items.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
				</ul>
			)}
			{!hasReviews && (
				<p className={styles["empty-placeholder"]}>
					No reviews yet. Be the first to leave a review!
				</p>
			)}
			<CreateReviewModal
				isOpen={isCreateReviewOpen}
				onClose={handleModalToggle}
				onSubmit={handleCreate}
				routeId={routeId}
			/>
		</section>
	);
};

export { RouteReviewsSection };
