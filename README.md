# Test source sample for Node JS

Author: lechidungvl
Mail: lechidungvl@gmail.com

## Skeleton
```
test
│
├─── src \\ Contain source test
├───── integration \\ Integration test
├──────── dataProvider \\ Common data for mock API or expected
├──────── testCase \\ Contain test cases for Integration test
├───── Campaign.test.js \\ Integration test for Campaign Gateway API
│
├───── unit \\ Unit test
├──────── dataProvider \\ Common data for mock function or expected
├──────── testCase \\ Contain test cases for Unit test
├───── LibsPlatformAPI.js \\ Unit test for function in Platform API library 
│
└─── package.json \\ Script test
```

## Development
### Config and run test
#### 1. Npm install
```
npm install
```
#### 2. Npm run test
```
# Run test watch all integration and unit test
npm run test-watch

# Run test all integration and unit test
npm run test

# Run integration test
npm run test-integration

# Run unit test
npm run test-unit

# Run test all integration, unit test and export coverage
npm run test-with-coverage
```
