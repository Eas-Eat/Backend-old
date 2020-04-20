module.exports = {
    verbose: true,
    rootDir: '.',
    roots: ['<rootDir>/src/', '<rootDir>/libs/', '<rootDir>/tests/'],
    setupFiles:['dotenv/config'],
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/libs/**/*.ts'],
    coveragePathIgnorePatterns: ['/node_modules/']
}