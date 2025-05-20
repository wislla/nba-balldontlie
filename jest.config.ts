import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(css|scss|png|jpg|jpeg|svg)$': 'jest-transform-stub',
  },

  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  collectCoverageFrom: ['src/**/*.{js,ts,vue}', '!src/main.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/api/index.ts',
    'src/routes/index.ts',
    'src/App.vue',
    'src/constants/playerTable.ts',
  ],
}

export default config
