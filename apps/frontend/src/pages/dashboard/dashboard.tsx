import { Button, Loader, Select } from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { fileApi } from "~/modules/files/files.js";
import { FileFolderName } from "~/modules/files/libs/enums/enums.js";

import { Carousel } from "../../libs/components/carousel/carousel.js";
import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const Dashboard = (): React.JSX.Element => {
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const fileInputReference = useRef<HTMLInputElement>(null);

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: { multiColors: [], singleColor: null },
	});

	const handleFileUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];

			if (!file) {
				return;
			}

			setIsUploading(true);

			try {
				const responseURL = await fileApi.uploadFile({
					file,
					folder: FileFolderName.AVATARS,
				});

				setUploadedImages((previous) => [...previous, responseURL.data.url]);
				setIsUploading(false);

				toastNotifier.showSuccess("File uploaded successfully");
			} catch (error: unknown) {
				setIsUploading(false);
				toastNotifier.showError(
					error instanceof HTTPError ? error.message : "Uploading file failed",
				);
			}
		},
		[],
	);

	const handleButtonClick = useCallback(() => {
		fileInputReference.current?.click();
	}, []);

	useEffect(() => {
		const loadFiles = async (): Promise<void> => {
			const response = await fileApi.getAllFiles();
			setUploadedImages(response.data.map((file) => file.url));
		};

		void loadFiles();
	}, []);

	return (
		<main className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Loader />
				<div className={styles["carousel-container"]}>
					<Carousel images={uploadedImages} />
				</div>

				<div className={styles["file-upload-container"]}>
					<label style={{ display: "block", marginBottom: "10px" }}>
						<Button
							label={isUploading ? "Loading..." : "Select File"}
							onClick={handleButtonClick}
							type="button"
						/>
						<input
							accept="image/*"
							disabled={isUploading}
							onChange={handleFileUpload}
							ref={fileInputReference}
							style={{ display: "none" }}
							type="file"
						/>
					</label>
				</div>
				<div className={styles["select-container"]}>
					<Select
						control={control}
						label="Single select"
						name="singleColor"
						options={colorOptions}
					/>
					<Select
						control={control}
						isMulti
						label="Multi select"
						name="multiColors"
						options={colorOptions}
					/>
				</div>
			</div>
		</main>
	);
};

export { Dashboard };
