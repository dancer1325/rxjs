# RxJS: Glossary And Semantics

## Major Entities

* == high level entities

### Consumer

* == code / subscribes to the observable
  * == -- is notified of --
    * [nexted](#next) values,
    * [errors](#error) or
    * [completions](#complete)

### Producer

* == system or thing / source of values -- are pushed -- out of the observable subscription == to the consumer
* ways to create
  * | [subscribe](#subscribe) action,
    * MAIN use case
    * 💡producer -- [subscription](#subscription) / 1:1💡
  * | OUTSIDE [subscribe](#subscribe) action -> 1-to-many == [multicast](#multicast)
    * allows
      * sharing producer BETWEEN MANY subscriptions

### Subscription

* == contract / [consumer](#consumer) -- is [observing](#observation) values pushed by a -- [producer](#producer)
  * == concept
* ⚠️!= `Subscription` class or type⚠️
* 's lifetime == [[subscribe](#subscribe) action is initiated, BEFORE the [subscribe](#subscribe) action is finished]

### Observable

* | RxJS,
  * primary type
* == template /
  * [Observer](#observer) (_Example:_ [consumer](#consumer)) -- can connect, via a [subscribe](#subscribe) action, to a -- [producer](#producer)

### Observer

* == [consumer](#consumer)'s manifestation
* == type /
  * may have SOME or ALL handlers / EACH type of [notification](#notification)
* != ["partial observer"](#partial-observer)

## Major Actions

* == 💡the highest level events / occur | VARIOUS parts in RxJS💡

### Subscribe

* == [consumer's act](#consumer) / set up a [subscription](#subscription)
  * request from an Observable
  * == [observe](#observation) a [producer](#producer)
* ALLOWED mechanisms
  * [`Observable.subscribe` method](/api/index/class/Observable#subscribe)
    * MAIN one
  * [`forEach` method](/api/index/class/Observable#forEach),
  * functions
    * [`lastValueFrom`](/api/index/function/lastValueFrom),
    * [`firstValueFrom`](/api/index/function/firstValueFrom),
    * deprecated [`toPromise` method](/api/index/class/Observable#forEach)

### Finalization

* := cleaning up resources -- used by a -- producer
* uses |
  * `error`,
  * `complete`
  * unsubscription
* ⚠️!= [unsubscription](#unsubscription)⚠️

### Unsubscription

The act of a [consumer](#consumer) telling a [producer](#producer) is no longer interested in receiving values
* Causes [Finalization](#finalization)

### Observation

* == [consumer](#consumer) reacting -- to --
  * [next](#next) [notifications](#notification)
  * [error](#error) [notifications](#notification)
  * [complete](#complete) [notifications](#notification)
* uses
  * ONLY | [subscription](#subscription)

### Observation Chain

When an [observable](#observable) uses another [observable](#observable) as a [producer](#producer), an "observation chain" is set up
* That is a chain of [observation](#observation) such that multiple [observers](#observer) are [notifying](#notification) each other in a unidirectional way toward the final [consumer](#consumer).

### Next

A value has been pushed to the [consumer](#consumer) to be [observed](#observation)
* Will only happen during [subscription](#subscription), and cannot happen after [error](#error), [complete](#error), or [unsubscription](#unsubscription)
* Logically, this also means it cannot happen after [finalization](#finalization).

### Error

The [producer](#producer) has encountered a problem and is notifying the [consumer](#consumer)
* This is a notification that the [producer](#producer) will no longer send values and will [finalize](#finalization)
* This cannot occur after [complete](#complete), any other [error](#error), or [unsubscription](#unsubscription)
* Logically, this also means it cannot happen after [finalization](#finalization).

### Complete

The [producer](#producer) is notifying the [consumer](#consumer) that it is done [nexting](#Next) values, without error, will send no more values, and it will [finalize](#finalization)
* [Completion](#complete) cannot occur after an [error](#error), or [unsubscribe](#unsubscription)
* [Complete](#complete) cannot be called twice
* [Complete](#complete), if it occurs, will always happen before [finalization](#finalization).

### Notification

* == act / [producer](#producer) pushes -- to a -- [consumer](#consumer)
  * [nexted](#next) values,
  * [errors](#error) or
  * [completions](#complete)
* != [`Notification` type](/api/index/class/Notification)
  * == notification -- manifested as a -- JavaScript object

## Major Concepts

Some of what we discuss is conceptual. These are mostly common traits of behaviors that can manifest in observables or in push-based reactive systems.

### Multicast

The act of one [producer](#producer) being [observed](#observation) by **many** [consumers](#consumer).

### Unicast

The act of one [producer](#producer) being [observed](#observation) by **only one** [consumer](#consumer). An observable is "unicast" when it only connects one [producer](#producer) to one [consumer](#consumer). Unicast doesn't necessarily mean ["cold"](#cold).

### Cold

An observable is "cold" when it creates a new [producer](#producer) during [subscribe](#subscribe) for every new [subscription](#subscription). As a result, "cold" observables are _always_ [unicast](#unicast), being one [producer](#producer) [observed](#observation) by one [consumer](#consumer). Cold observables can be made [hot](#hot) but not the other way around.

### Hot

An observable is "hot", when its [producer](#producer) was created outside of the context of the [subscribe](#subscribe) action. This means that the "hot" observable is almost always [multicast](#multicast). It is possible that a "hot" observable is still _technically_ unicast, if it is engineered to only allow one [subscription](#subscription) at a time, however, there is no straightforward mechanism for this in RxJS, and the scenario is an unlikely one. For the purposes of discussion, all "hot" observables can be assumed to be [multicast](#multicast). Hot observables cannot be made [cold](#cold).

### Push

[Observables](#observable) are a push-based type. That means rather than having the [consumer](#consumer) call a function or perform some other action to get a value, the [consumer](#consumer) receives values as soon as the [producer](#producer) has produced them, via a registered [next](#next) handler.

### Pull

Pull-based systems are the opposite of [push](#push)-based. In a pull-based type or system, the [consumer](#consumer) must request each value the [producer](#producer) has produced manually, perhaps long after the [producer](#producer) has actually done so. Examples of such systems are [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) and [Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

## Minor Entities

### Operator

A factory function that creates an [operator function](#operator-function). Examples of this in rxjs are functions like [`map`](/api/operators/map) and [`mergeMap`](/api/operators/mergeMap), which are generally passed to [`pipe`](/api/index/class/Observable#pipe). The result of calling many operators, and passing their resulting [operator functions](#operator-function) into pipe on an observable [source](#source) will be another [observable](#observable), and will generally not result in [subscription](#subscription).

### Operator Function

A function that takes an [observable](#observable), and maps it to a new [observable](#observable). Nothing more, nothing less. Operator functions are created by [operators](#operator). If you were to call an rxjs operator like [map](/api/operators/map) and put the return value in a variable, the returned value would be an operator function.

### Operation

An action taken while handling a [notification](#notification), as set up by an [operator](#operator) and/or [operator function](#operator-function). In RxJS, a developer can chain several [operator functions](#operator-function) together by calling [operators](#operator) and passing the created [operator functions](#operator-function) to the [`pipe`](/api/index/class/Observable#pipe) method of [`Observable`](/api/index/class/Observable), which results in a new [observable](#observable). During [subscription](#subscription) to that observable, operations are performed in an order dictated by the [observation chain](#observation-chain).

### Stream

A "stream" or "streaming" in the case of observables, refers to the collection of [operations](#operation), as they are processed during a [subscription](#subscription). This is not to be confused with node [Streams](https://nodejs.org/api/stream.html), and the word "stream", on its own, should be used _sparingly_ in documentation and articles. Instead, prefer [observation chain](#observation-chain), [operations](#operation), or [subscription](#subscription). "Streaming" is less ambiguous, and is fine to use given this defined meaning.

### Source

An [observable](#observable) or [valid observable input](#observable-inputs) having been converted to an observable, that will supply values to another [observable](#observable), either as the result of an [operator](#operator) or other function that creates one observable as another. This [source](#source), will be the [producer](#producer) for the resulting [observable](#observable) and all of its [subscriptions](#subscriptions). Sources may generally be any type of observable.

### Observable Inputs

An "observable input" ([defined as a type here](/api/index/type-alias/ObservableInput)), is any type that can be easily converted to an [Observable](#observable). Observable Inputs may sometimes be referred to as "valid observable sources".

### Notifier

An [observable](#observable) that is being used to notify another [observable](#observable) that it needs to perform some action. The action should only occur on a [next notification](#next), and never on [error](#error) or [complete](#complete). Generally, notifiers are used with specific operators, such as [`takeUntil`](/api/operators/takeUntil), [`buffer`](/api/operators/buffer), or [`delayWhen`](/api/operators/delayWhen). A notifier may be passed directly, or it may be returned by a callback.

### Inner Source

One, of possibly many [sources](#source), which are [subscribed](#subscribe) to automatically within a single [subscription](#subscription) to another observable. Examples of an "inner source" include the [observable inputs](#observable-inputs) returned by the mapping function in a [mergeMap](/api/operators/mergeMap) [operator](#operator). (e.g. `source.pipe(mergeMap(value => createInnerSource(value)))`, where `createInnerSource` returns any valid [observable input](#observable-inputs)).

### Partial Observer

* == [observer](#observer) / lacks ALL NECESSARY [notification](#notification) handlers

## Other Concepts

### Unhandled Errors

An "unhandled error" is any [error](#error) that is not handled by a [consumer](#consumer)-provided function, which is generally provided during the [subscribe](#subscribe) action. If no error handler was provided, RxJS will assume the error is "unhandled" and rethrow the error on a new callstack to prevent ["producer interference"](#producer-interference).

### Producer Interference

[Producer](#producer) interference happens when an error is allowed to unwind the RxJS callstack during [notification](#notification). When this happens, the error could break things like for-loops in [upstream](#upstream-and-downstream) [sources](#source) that are [notifying](#notification) [consumers](#consumer) during a [multicast](#multicast). That would cause the other [consumers](#consumer) in that [multicast](#multicast) to suddenly stop receiving values without logical explanation. As of version 6, RxJS goes out of its way to prevent producer interference by ensuring that all unhandled errors are thrown on a separate callstack.

### Upstream And Downstream

The order in which [notifications](#notification) are processed by [operations](#operation) in a [stream](#stream) have a directionality to them. "Upstream" refers to an [operation](#operation) that was already processed before the current [operation](#operation), and "downstream" refers to an [operation](#operation) that _will_ be processed _after_ the current [operation](#operation). See also: [Streaming](#stream).
