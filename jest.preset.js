module.exports = {
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js'],
    coverageReporters: ['html'],
    testEnvironment: 'node',
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
};