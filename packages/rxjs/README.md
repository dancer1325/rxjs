# Versions | this repository

* [6.x branch](https://github.com/ReactiveX/rxjs/tree/6.x)
* [7.x branch](https://github.com/ReactiveX/rxjs/tree/7.x)
* [master](https://github.com/ReactiveX/rxjs/commits/master)
  * CURRENT work
    * == v8

## how to use?

### ES6 -- via -- npm

```shell
npm install rxjs
```

* recommendations
  * | Observable creation,
    * pull methods / you need, 👀DIRECTLY -- from -- `'rxjs'`👀
      * | RxJS v7.2+,
        * pull -- from -- `'rxjs'`
      * | RxJS v7.2-,
        * pull -- from -- `'rxjs/operators'`

## Goals

- bundles sizes
  - smaller
- follow the [Observable Spec Proposal](https://github.com/zenparsing/es-observable)
- provide
  - MORE
    - modular file structure / variety of formats
    - debuggable call stacks
      - == VS preceding versions of RxJS
  - BETTER performance

## Building/Testing

- `yarn compile`
  - build everything
- `npm test`
  - run tests
- `yarn dtslint`
  - run dtslint tests
