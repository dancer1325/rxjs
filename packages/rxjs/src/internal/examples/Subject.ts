import { Subject } from 'rxjs';

// 1. new Subject<T>()
const subjectConstructor = new Subject<number>();
console.log("typeof subjectConstructor ", typeof subjectConstructor);
console.log("subjectConstructor.constructor.name", subjectConstructor.constructor.name);      // Subject

// 2. next(value: T)
const subjectGenericType = new Subject();
// 2.1 read values FROM subscribe
subjectGenericType.next(1);     // NOT read, because hit BEFORE subscribing it

// 2.2 read values FROM subscribe
subjectGenericType.subscribe(x => {console.log("subjectGenericType - next - ", x)});
subjectGenericType.next({});    // read, because ALREADY observer subscribe | this subject

// 3. unsubscribe()
subjectGenericType.unsubscribe();
subjectGenericType.next(2);         // throw an error
