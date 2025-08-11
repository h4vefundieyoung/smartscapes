import { memo } from "react";

import { useCallback } from "~/libs/hooks/hooks.js";

import Edit from "../../../assets/edit.svg?react";
import Trash from "../../../assets/trash.svg?react";
import styles from "./styles.module.css";

type ActionCellProperties = {
	id: number;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
};

const ActionCell = memo(({ id, onDelete, onEdit }: ActionCellProperties) => {
	const handleEditClick = useCallback((): void => {
		onEdit(id);
	}, [id, onEdit]);

	const handleDeleteClick = useCallback(() => {
		onDelete(id);
	}, [id, onDelete]);

	return (
		<div className={styles["actions-cell"]}>
			<button
				aria-label="Edit"
				className={styles["icon-button"]}
				onClick={handleEditClick}
				type="button"
			>
				<Edit />
			</button>
			<button
				aria-label="Delete"
				className={styles["icon-button"]}
				onClick={handleDeleteClick}
				type="button"
			>
				<Trash />
			</button>
		</div>
	);
});

ActionCell.displayName = "ActionCell";

export { ActionCell };
