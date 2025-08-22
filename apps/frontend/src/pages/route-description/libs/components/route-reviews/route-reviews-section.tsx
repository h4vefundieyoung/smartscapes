import { useCallback, useState } from "react";

import {
	Button,
	CreateReviewModal,
	ReviewCard,
} from "~/libs/components/components.js";
import {
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
} from "~/modules/route-details/route-details.js";

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

export { RouteReviewsSection };
