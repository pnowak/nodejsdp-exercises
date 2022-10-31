# 3.2 Ticker:

Write a function that accepts a `number` and a `callback` as the arguments. 
The function will return an `EventEmitter` that emits an event called `tick` every 50 miliseconds until the `number` of milliseonds is passed from the invocation of the function.
The function will also call the `callback` when the `number` of milliseconds has passed, providing, as the result, the total count of `tick` events emitter. 

HINT: you can use `setTimeouot()` to schedule another `setTimeout` recursively.

To run the solution launch:
```bash
ts-node index.ts
```