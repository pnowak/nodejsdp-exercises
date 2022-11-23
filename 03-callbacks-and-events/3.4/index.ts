import EventEmitter from 'node:events';

type CallbackType = (err: Error | null, ticks: number) => void;

function ticker (number: number, callback: CallbackType): EventEmitter {
    const emitter = new EventEmitter();
    const timeout = 50;
    let totalCountOfTicks = 0;
    let countOfTicks = 0;

    process.nextTick(() => {
        if (Date.now() % 5 === 0) {
            emitter.emit('error', 'Divisible by 5');
        }

        emitter.emit('tick', totalCountOfTicks)
    });

    function increment() {
        countOfTicks += 1;
    }

    let timer = setTimeout(function myTimer() {
        if (countOfTicks === timeout) {
            totalCountOfTicks += 1;
            countOfTicks = 0;

            if (Date.now() % 5 === 0) {
                emitter.emit('error', 'Divisible by 5');
            }

            emitter.emit('tick', totalCountOfTicks);
        }

        increment();
        timer = setTimeout(myTimer, timeout);

        if ((totalCountOfTicks * countOfTicks) >= number) {
            callback(null, totalCountOfTicks);
            clearTimeout( timer );
        }
    }, number);

    return emitter;
}

ticker(
    160,
    (err, ticks) => {
        if (err) {
            return console.error(err, err.message)
        }
        console.log(`Total count of 'tick' events - ${ticks}`)
    })
    .on('tick', tick => console.log(`Count of 'tick' events - ${tick}`))
    .on('error', (error) => console.error(error))
