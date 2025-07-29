import { of } from 'rxjs';

const observable = of(1,2,3)

// 1. observer   ==    1 callback / EACH type of notification
const observer = {
  next: x => console.log('Observer got a next value: ' + x),              // 1 callback -- for -- next
  error: err => console.error('Observer got an error: ' + err),           // 1 callback -- for -- error
  complete: () => console.log('Observer got a complete notification'),    // 1 callback -- for -- complete
};

// 2. way to use observer
observable.subscribe(observer);

// 3. partial observer
const partialObserver = {
  // miss complete: () => {}
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
};

// 4. `observable.subscribe(callBackFunction)`            💡callBackFunction  == next callback function💡
observable.subscribe(x => console.log('create observable | subscribe,   next callback function ' + x));
