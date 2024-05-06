/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const coverage = 100;

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/coverage/",
    "/jest.setup.ts",
    "/utils/constants.ts",
  ],
  coverageThreshold: {
    global: {
      statements: coverage,
      branches: coverage,
      functions: coverage,
      lines: coverage,
    },
  },
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  maxWorkers: "80%",
};

export default createJestConfig(config);
