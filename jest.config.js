const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const esModules = ['msw', 'unified']

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [`/node_modules/(?!${esModules.join('|')})/`],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/constants/(.*)$': '<rootDir>/src/common/constants/$1',
    '^@/styles/(.*)$': '<rootDir>/src/common/styles/$1',
    '^@/types/(.*)$': '<rootDir>/src/common/types/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/components/layouts/$1',
    '^@/uiElements/(.*)$': '<rootDir>/src/components/uiElements/$1',
    '^@/uiParts/(.*)$': '<rootDir>/src/components/uiParts/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)()
  return {
    ...jestConfig,
    transformIgnorePatterns: jestConfig.transformIgnorePatterns.filter(
      (pattern) => pattern !== '/node_modules/'
    )
  }
}