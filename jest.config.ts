module.exports = {
  preset: "ts-jest",
  displayName: 'APIs',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/tests/**/*'],
};