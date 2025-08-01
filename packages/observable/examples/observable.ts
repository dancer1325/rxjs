import { Observable } from 'rxjs';

// 1. class Observable
// 1.1 constructor
// 1.1.1 `subscribe?`
const observableWithoutSubscribe = new Observable()     // subscribe    can be omitted
console.log(`observableWithoutSubscribe ${observableWithoutSubscribe}`)

// 1.1.2    this      can be omitted to pass it
const observableWithThis = new Observable(function(this, subscriber) {
  console.log(`class Observable - constructor - this - passed ${this}`);
})
observableWithThis.subscribe(x => {
  console.log('class Observable - constructor - this - passed ', x);      // NOT reached because observable does NOT emit any value
  }
)
const observableWithoutThis = new Observable(function(subscriber) {
  console.log(`class Observable - constructor - this - NO passed ${this}`);
})
observableWithoutThis.subscribe(x => {
    console.log('class Observable - constructor - this - NO passed ', x);   // NOT reached because observable does NOT emit any value
  }
)

// 1.1.3    subscriber      can be omitted to pass it
const observableWithSubscriber = new Observable(function(subscriber) {
  console.log(`class Observable - constructor - subscriber - passed ${subscriber}`);
})
console.log(`class Observable - constructor - subscriber - passed ${observableWithSubscriber}`);
const observableWithoutSubscriber = new Observable(function() {
  console.log(`class Observable - constructor - subscriber - NO passed`);
})
console.log(`class Observable - constructor - subscriber - NO passed ${observableWithoutSubscriber}`);

// 1.1.4    subscribe      | initially subscribe the Observable, is called
const observableAtSubscribeSubscribeFunctionIsCalled = new Observable(function() {
  console.log(`class Observable - constructor - subscribe - | initially subscribe the Observable, is called`);
})
observableAtSubscribeSubscribeFunctionIsCalled.subscribe(x => {
    console.log('class Observable - constructor - subscribe - | initially subscribe the Observable, is called - next ', x);      // NOT reached because observable does NOT emit any value
  }
)

// 1.1.4    subscribe     passed -- to -- `Subscriber`
const subscribeFunctionPassedToSubscriber = function(subscriber) {
  console.log('class Observable - constructor - subscribe - passed to subscriber - typeof subscriber ', typeof subscriber);
  console.log('class Observable - constructor - subscribe - passed to subscriber - subscriber.constructor.name ', subscriber.constructor.name);
  console.log('class Observable - constructor - subscribe - passed to subscriber - subscriber.constructor.name === Subscriber ', subscriber.constructor.name === 'Subscriber');
};

const observableSubscribeFunctionPassedToSubscriber = new Observable(subscribeFunctionPassedToSubscriber);

observableSubscribeFunctionPassedToSubscriber.subscribe(x => {
    console.log('class Observable - constructor - subscribe - passed to subscriber');      // NOT reached because observable does NOT emit any value
  }
)
