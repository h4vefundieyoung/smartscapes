import { useCallback, useState } from "react";

import {
	Button,
	Header,
	Loader,
	Select,
	Sidebar,
} from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useAppSelector } from "~/libs/hooks/hooks.js";
import { filesApi } from "~/modules/files/files.js";
import { type FileContentType } from "~/modules/files/libs/types/types.js";

import { mockImages } from "../../libs/components/carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../../libs/components/carousel/carousel.js";
import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const ONE = 1;

const Dashboard = (): React.JSX.Element => {
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: {
			multiColors: [],
			singleColor: null,
		},
	});

	const handleFileUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];

			if (!file) {
				return;
			}

			setIsUploading(true);

			try {
				const responseURL = await filesApi.uploadFile(
					{
						fileName: file.name,
						fileSize: file.size,
						fileType: file.type as FileContentType,
					},
					file,
				);

				setUploadedImages((previous) => [...previous, responseURL]);

				// eslint-disable-next-line no-console
				console.log("File uploaded successfully!");
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error("Upload failed:", error);
			} finally {
				setIsUploading(false);
			}
		},
		[],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Header
					actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
					user={authenticatedUser}
				/>
				<div className={styles["sidebar-container"]}>
					<Sidebar navigationItems={NAVIGATION_ITEMS} />
				</div>
				<Loader />
				<div className={styles["button-container"]}>
					<Button label="Button for test" type="button" />
				</div>
				<div className={styles["carousel-container"]}>
					<Carousel images={mockImages} />
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
				<div
					style={{ border: "1px solid #ccc", margin: "20px", padding: "20px" }}
				>
					<h3>File Upload Test</h3>
					<input
						accept="image/*"
						disabled={isUploading}
						onChange={handleFileUpload}
						style={{ marginBottom: "10px" }}
						type="file"
					/>
					{isUploading && <p>Uploading...</p>}
					<div
						style={{
							display: "grid",
							gap: "10px",
							gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
							marginTop: "20px",
						}}
					>
						{uploadedImages.map((imageUrl, index) => (
							<div
								key={index}
								style={{ border: "1px solid #ddd", padding: "10px" }}
							>
								<img
									alt={`Uploaded ${String(index + ONE)}`}
									src={imageUrl}
									style={{ height: "150px", objectFit: "cover", width: "100%" }}
								/>
								<p style={{ fontSize: "12px", marginTop: "5px" }}>{imageUrl}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export { Dashboard };
