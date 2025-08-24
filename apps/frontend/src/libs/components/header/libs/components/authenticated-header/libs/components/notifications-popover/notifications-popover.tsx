import { Icon } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as notificationActions } from "~/modules/notification/notification.js";

import { NotificationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

const NotificationsPopover = (): React.JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const containerReference = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const notifications = useAppSelector(
		(state) => state.notification.notifications,
	);

	useEffect(() => {
		void dispatch(notificationActions.getNotifications());
	}, [dispatch]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (
				containerReference.current &&
				!containerReference.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleToggle = useCallback((): void => {
		setOpen((previous) => !previous);
	}, []);

	return (
		<div className={styles["container"]} ref={containerReference}>
			<button className={styles["button"]} onClick={handleToggle}>
				<Icon height={20} name="bell" width={18} />
			</button>

			{open && (
				<div className={styles["content"]}>
					<h3 className={styles["title"]}>Notifications</h3>
					{notifications.length > 0 ? (
						<ul className={styles["list"]}>
							{notifications.map(({ content, createdAt, entityId, id }) => (
								<NotificationItem
									content={content}
									createdAt={createdAt}
									entityId={entityId}
									key={id}
								/>
							))}
						</ul>
					) : (
						<div className={styles["empty"]}>No notifications</div>
					)}
				</div>
			)}
		</div>
	);
};

export { NotificationsPopover };
