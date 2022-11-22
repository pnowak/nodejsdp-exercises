# 3.4 Playing with errors:

Modify the function vreted in exercise 3.3 so that it produces an error if the timestamp at the moment of a `tick` (including the initial one that we added as part of exercise 3.3)
is divisible by 5. Propagete the error using both the callback and the event emitter.

HINT: use Date.now() to get the timestamp and the reminder (%) operator to check whether the timestamp is divisible by 5.

To run the solution launch:
```bash
npm run start
```