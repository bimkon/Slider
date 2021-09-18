module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  verbose: true,
  // setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
