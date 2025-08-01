import { Observable } from 'rxjs';

// 1. class Observable
// 1.1 constructor

const observable = new Observable(function(subscriber) {
  console.log('class Observable - constructor ', this, subscriber);

  // Emitir valores
  subscriber.next('valor1');
  subscriber.next('valor2');
  subscriber.complete();
})
observable.subscribe(x => {
  console.log('class Observable - constructor - subscribe ', x);
  }
)
