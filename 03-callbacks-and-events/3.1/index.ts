import EventEmitter from 'node:events';
import { readFile } from 'node:fs';

class FindRegex extends EventEmitter {
    private regex: RegExp;
    private files: string[];
    
    constructor (regex: RegExp) {
        super()
        this.regex = regex
        this.files = []
    }

    addFile (file: string): this {
        this.files.push(file)
        return this
    }

    find (): this {
        process.nextTick(() => this.emit('start', this.files));

        for (const file of this.files) {
            readFile(file, 'utf8', (err, content) => {
                if (err) {
                    return this.emit('error', err)
                }

                this.emit('fileread', file)

                const match = content.match(this.regex)
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem))
                }
            })
        }
        return this
    }
}

const findRegexInstance = new FindRegex(/Look \w+/)
findRegexInstance
    .addFile('fileA.txt')
    .addFile('fileB.json')
    .find()
    .on('start', files => console.log(`Process start with ${files}`))
    .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
    .on('error', err => console.error(`Error emitted ${err.message}`))
