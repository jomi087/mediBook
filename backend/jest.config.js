export default {
  // Use the Node.js runtime instead of a browser-like (jsdom) environment.
  // This is appropriate for backend applications like Express APIs.
  testEnvironment: "node",
  testTimeout: 10000,

  // Run this file before every test suite.
  // This lets us keep common setup (like database connection , dotenv.config and global hooks)
  // in one place instead of importing the same setup code in every test file.
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.js"],

  // Generate a code coverage report after running the tests.
  // The report shows how much of the application's code is exercised by tests.
  // collectCoverage: false,

  // Include these source files in the coverage report even if they were never
  // imported during the test run. Without this, Jest only reports coverage for
  // files that were actually executed, which can hide completely untested files.

  //collectCoverageFrom only checks the files and folders that you explicitly tell Jest to include.
  // collectCoverageFrom: [
  // "controllers/**/*.js",
  // "services/**/*.js",
  // "repositories/**/*.js",
  // "middleware/**/*.js",
  // "models/**/*.js",
  // "routes/**/*.js",
  // "utils/**/*.js",
  // "validations/**/*.js",
  // "config/**/*.js",
  // ]
};