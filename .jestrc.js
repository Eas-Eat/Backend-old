module.exports = {
    verbose: true,
    rootDir: '.',
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    setupFiles:['dotenv/config'],
    globalSetup: './tests/jest.setup.ts',
    globalTeardown: './tests/jest.teardown.ts',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/{!(main),}.ts', '<rootDir>/libs/**/*.ts'],
    coveragePathIgnorePatterns: ['/node_modules/']
}