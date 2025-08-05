* [Reference](https://rxjs.dev/api) examples

# How has it been created?
* Create 'package.json' | ANOTHER path, and paste here
  * Reason: you get `npm init` getting "npm error Cannot read properties of null (reading 'edgesOut')"
* `npm install --save-dev jest @jest/globals`
  * Reason: execute tests

# How to run?
## ".ts"
* if it's "*.ts" -> `tsc fileName.ts`
  * generate "fileName.js"
* `node fileName.js`
  * Problems:
    * | importingExportSites,
      * Problem1: ReferenceError: WebSocket is not defined
        * Attempt1: `npm install ws @types/ws`
        * Solution: TODO:
## ".html"
* | browser, opens it

## "*test.ts"
* `jest test`
  * Problems:
    * Problem1: "Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax."
      * Solution: TODO:
