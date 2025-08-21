import { useCallback, useState } from "react";

import {
	Button,
	CreateReviewModal,
	ReviewCard,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	actions as reviewActions,
	type ReviewRequestDto,
} from "~/modules/reviews/reviews.js";

import styles from "./styles.module.css";

type Properties = {
	routeId: number;
};

const RouteReviews = ({ routeId }: Properties): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const isAuthenticatedUser = useAppSelector(({ auth }) =>
		Boolean(auth.authenticatedUser),
	);
	const items = useAppSelector(({ review }) => review.items);
	const [isCreateReviewOpen, setIsCreateReviewOpen] = useState<boolean>(false);

	const handleModalToggle = useCallback(() => {
		setIsCreateReviewOpen((previous) => !previous);
	}, []);

	useEffect(() => {
		void dispatch(reviewActions.getAll({ routeId }));
	}, [dispatch, routeId]);

	const handleCreate = useCallback(
		(payload: ReviewRequestDto): void => {
			void dispatch(reviewActions.create(payload)).unwrap();
			setIsCreateReviewOpen(false);
		},
		[dispatch],
	);

	return (
		<section className={styles["section"]}>
			<div className={styles["header"]}>
				<h2 className={styles["title"]}>Reviews</h2>
				{isAuthenticatedUser && (
					<Button label="Leave review" onClick={handleModalToggle} />
				)}
			</div>
			<ul className={styles["list"]}>
				{items.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</ul>
			<CreateReviewModal
				isOpen={isCreateReviewOpen}
				onClose={handleModalToggle}
				onSubmit={handleCreate}
				routeId={routeId}
			/>
		</section>
	);
};

export { RouteReviews };
