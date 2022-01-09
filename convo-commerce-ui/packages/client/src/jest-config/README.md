# JEST CONFIG

Use the **roots** to configure source folder from where the test files needs to be picked.

``` json
roots: ["<rootDir>/src"]
```

Use the **setupFilesAfterEnv** to configure configuration that needs to be run before every test case. In this case we are import `import '@testing-library/jest-dom';` before executing every test case.

``` json
setupFilesAfterEnv: ["<rootDir>/src/jest-config/setupTests.js"]
```
