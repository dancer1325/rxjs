import { ReplaySubject } from 'rxjs';

// 1. new ReplaySubject(bufferSize)
function replaySubjectNewBufferSize() {
  const subject = new ReplaySubject(3);   // ⚠️buffer 3 values | NEW subscribers⚠️

  subject.subscribe({
    next: (v) => console.log(`replaySubject - observerBeforeEmitting - next ${v}`),
  });

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);      // observer BEFORE emitting receive ALL, BUT ONLY records the LAST buffer ones

  subject.subscribe({
    next: (v) => console.log(`replaySubject - observerAfterAlreadyEmitted - next ${v}`),    // ⚠️get OLD values, BUT ONLY the LAST buffer ones⚠️
  });

  subject.next(5);
}
replaySubjectNewBufferSize();

// 2. new ReplaySubject(bufferSize, windowTime)
function replaySubjectNewBufferAndWindowTime() {
  const subject = new ReplaySubject(100, 500 /* windowTime */);

  subject.subscribe({
    next: (v) => console.log(`replaySubjectNewBufferAndWindowTime - observerBeforeEmitting - next ${v}`),
  });

  let i = 1;
  setInterval(() => subject.next(i++), 200);

  setTimeout(() => {
    subject.subscribe({
      next: (v) => console.log(`replaySubjectNewBufferAndWindowTime - observerAfterEmitting - next ${v}`),    // | subscribe this observer, ALREADY emitted 4 & buffer 100, BUT ONLY record during the LAST 500 ms
    });
  }, 1000);
}
replaySubjectNewBufferAndWindowTime();
