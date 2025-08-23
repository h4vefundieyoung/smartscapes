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

import { PopoverItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Popover = (): React.JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const reference = useRef<HTMLDivElement>(null);
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
				reference.current &&
				!reference.current.contains(event.target as Node)
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
		<div className={styles["container"]} ref={reference}>
			<button className={styles["button"]} onClick={handleToggle}>
				<Icon height={20} name="bell" width={18} />
			</button>

			{open && (
				<div className={styles["content"]}>
					<h3 className={styles["title"]}>Notifications</h3>
					<ul className={styles["list"]}>
						{notifications.length > 0 ? (
							notifications.map((notification) => (
								<PopoverItem
									content={notification.content}
									createdAt={notification.createdAt}
									entityId={notification.entityId}
									key={notification.id}
								/>
							))
						) : (
							<li className={styles["empty"]}>No notifications</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export { Popover };
