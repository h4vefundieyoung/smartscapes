import { defineConfig } from "@playwright/test";
import { config } from "dotenv";
import process from "node:process";

config();

const serverAPIBaseURL = process.env["API_BASE_URL"];

const playwrightConfig = defineConfig({
	reporter: [["html", { open: "never", outputFolder: "test-report" }]],
	testDir: "./tests",
	timeout: 45_000,
	use: {
		baseURL: serverAPIBaseURL,
		ignoreHTTPSErrors: true,
		trace: "retain-on-failure",
	},
});

export default playwrightConfig;
