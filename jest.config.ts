module.exports = {
  preset: "ts-jest",
  displayName: 'APIs',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/tests/**/*'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};