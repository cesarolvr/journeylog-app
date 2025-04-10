module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(luxon)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironmentOptions: {
    NODE_OPTIONS: "--no-warnings"
  }
}; 