# Installation Instructions

## ES2015 -- via -- npm

```shell
npm install rxjs
```

* RxJS 7.x,
  * by default, provide DIFFERENT variants of the code -- based on the -- consumer
    * if you use
      * RxJS 7.x + Node.js -> CommonJS code / target ES5 is provided -- for -- execution
      * RxJS 7.4+ -- via a -- bundler targeting a browser (OR OTHER NON-Node.js platform) -> ES module code targeting ES5 + ES2015 code option
      * RxJS ^7.4.4.0,
        * ONLY provide ES5 code

* TODO: If the target browsers for a project support ES2015+ or the bundle process supports down-leveling to ES5 then the bundler can optionally be configured to allow the ES2015 RxJS code to be used instead.
You can enable support for using the ES2015 RxJS code by configuring a bundler to use the `es2015` custom export condition during module resolution.
Configuring a bundler to use the `es2015` custom export condition is specific to each bundler.
If you are interested in using this option, please consult the documentation of your bundler for additional information.
However, some general information can be found here:

- https://webpack.js.org/guides/package-exports/#conditions-custom
- https://github.com/rollup/plugins/blob/node-resolve-v11.0.0/packages/node-resolve/README.md#exportconditions

To import only what you need, please {@link guide/importing#es6-via-npm check out this} guide.

## CommonJS -- via -- npm

* POSSIBLE PROBLEMS:
  * Problem1: "error TS2304: Cannot find name 'Promise' or error TS2304: Cannot find name'Iterable' when using RxJS you may need to install a supplemental set of typings."
    * Solution:
      * | typings users

        ```shell
        typings install es6-shim --ambient
        ```

      * if you're NOT using typings -> the interfaces can be copied -- FROM -- "/es6-shim/es6-shim.d.ts."
      * add type definition file / included | "tsconfig.json" OR CLI argument

## All Module Types (CJS/ES6/AMD/TypeScript) -- via -- npm

* if you are using
  * npm version 3
    ```shell
    npm install @reactivex/rxjs
    ```
  * npm version 2

    ```shell
    npm install @reactivex/rxjs@7.3.0
    ```
