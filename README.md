# <img src="apps/rxjs.dev/src/assets/images/logos/Rx_Logo_S.png" alt="RxJS Logo" width="86" height="86"> RxJS: Reactive Extensions For JavaScript

![CI](https://github.com/reactivex/rxjs/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/rxjs.svg)](http://badge.fury.io/js/rxjs)
[![Join the chat at https://gitter.im/Reactive-Extensions/RxJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Reactive-Extensions/RxJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# RxJS 8 Monorepo

* == rewrite of [Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS) /
  * mostly backwards compatible
    * mostly != ALL
      * Reason: 🧠SOME breaking changes / reduce the API surface🧠
  * Reason: 🧠
    * better performance,
    * better modularity,
    * better debuggable call stacks
* == latest RxJS' production-ready version

## Structure

* [/packages](/packages/)
  * RxJS +
  * related packages
* [/apps](/apps/)
  * [rxjs.dev](https://rxjs.dev) documentation site

## Versions In This Repository

* [master](https://github.com/ReactiveX/rxjs/commits/master)
  * == CURRENT work
  * v8
* [7.x](https://github.com/ReactiveX/rxjs/tree/7.x)
* [6.x](https://github.com/ReactiveX/rxjs/tree/6.x)

## Development

* -- via -- `yarn`
  * Reason: 🧠because of [this issue](https://github.com/npm/rfcs/issues/287#issuecomment-1727960500) 🧠
(Basically the docs app uses `@types/jasmine`, and the package uses `@types/mocha` and they get hoisted to the top level by `npm install` with workspaces, and then TypeScript vomits everywhere when you try to build).

* steps,
  * | repository root
    1. `yarn install`
    2. `yarn workspace rxjs test`
       * run the RxJS test suite
    3. `yarn workspace rxjs.dev start`
       * start the rxjs.dev documentation site local development server

## License

* [Apache 2.0 License](LICENSE.txt)