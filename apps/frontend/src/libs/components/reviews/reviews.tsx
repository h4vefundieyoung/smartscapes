import { useCallback, useState } from "react";

import { Button } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	actions as reviewActions,
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
} from "~/modules/reviews/reviews.js";

import { CreateReviewModal } from "../create-review-modal/create-review-modal.js";
import { ReviewCard } from "../review-card/review-card.js";
import styles from "./styles.module.css";

type Properties = {
	routeId: number;
};

const Reviews = ({ routeId }: Properties): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const hasAuthenticatedUser = useAppSelector(({ auth }) =>
		Boolean(auth.authenticatedUser),
	);

	const [items, setItems] = useState<ReviewGetByIdResponseDto[]>([]);
	const [status, setStatus] = useState<ValueOf<typeof DataStatus>>(
		DataStatus.IDLE,
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = useCallback((): void => {
		setIsOpen(true);
	}, []);

	const closeModal = useCallback((): void => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		let mounted = true;
		setStatus(DataStatus.PENDING);

		void dispatch(reviewActions.getAll({ routeId }))
			.unwrap()
			.then((response) => {
				if (!mounted) {
					return;
				}

				setItems(response.data);
				setStatus(DataStatus.FULFILLED);
			})
			.catch(() => {
				if (!mounted) {
					return;
				}

				setStatus(DataStatus.REJECTED);
			});

		return (): void => {
			mounted = false;
		};
	}, [dispatch, routeId]);

	const handleCreate = useCallback(
		async (values: ReviewRequestDto): Promise<void> => {
			const created = await dispatch(reviewActions.create(values)).unwrap();
			setItems((previous) => [created.data, ...previous]);
			setIsOpen(false);
		},
		[dispatch],
	);

	return (
		<section className={styles["section"]}>
			<div className={styles["bar"]}>
				<h2 className={styles["title"]}>Reviews</h2>
				{hasAuthenticatedUser ? (
					<div>
						<Button label="Leave review" onClick={openModal} />
					</div>
				) : null}
			</div>

			{status === DataStatus.PENDING ? (
				<div className={styles["info"]}>Loading…</div>
			) : null}
			{status === DataStatus.REJECTED ? (
				<div className={styles["info"]}>Failed to load reviews</div>
			) : null}

			<ul className={styles["list"]}>
				{items.map((r) => (
					<ReviewCard key={r.id} review={r} />
				))}
			</ul>

			<CreateReviewModal
				isOpen={isOpen}
				onClose={closeModal}
				onSubmit={handleCreate}
				routeId={routeId}
			/>
		</section>
	);
};

export { Reviews };
