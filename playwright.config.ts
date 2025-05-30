import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: ["tests/**/*.spec.ts"],
  use: {
    baseURL: "https://jupiter.cloud.planittesting.com/",
    headless: false, // Set to false if you want to see the browser during tests
    screenshot: "on", // Take screenshots only on test failure
    video: "retain-on-failure", // Record video only on test failure
    launchOptions: {
      slowMo: 50, // Slow down operations by 50ms for better visibility during debugging
    },
  },
  //retries: 2, // Retry failed tests up to 2 times
  reporter: [
    ["dot"],
    ["json", { outputFile: "reports/jsonReports.json" }],
    ["allure-playwright"], // Use Allure reporter for generating reports
    ["html", { open: "never" }], // Do not open the HTML report automatically after tests
  ], // Use dot reporter and output results to a JSON file, // Do not open the HTML report automatically after tests
  workers: 1, // Run tests in a single worker to avoid concurrency issues
};

export default config;
