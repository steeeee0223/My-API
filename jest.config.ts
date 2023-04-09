import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@build/(.*)$': '<rootDir>/build/$1',
        '^@config/(.*)$': '<rootDir>/config/$1',
    },
}

export default jestConfig
