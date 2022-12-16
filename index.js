
import xlsx from '@ailnaf/xlsx2csv'
import { stringify } from 'csv-stringify'
import { Readable, Transform } from 'stream'

export default function xlsx2stream(file, options = {}) {

    const {
        json,
    } = options

    let started = false

    const start = (reader) => {
        if (started) return
        started = true

        xlsx(file, data => {
            reader.push(data)
        }, { sheet: { json }})
        .then(() => {
            reader.push(null)
        })
        .catch((e) => reader.destroy(e))
    }

    return new Readable({
        objectMode: true,
        read() {
            start(this)
        },
    })
}

export function xlsx2csv(file, options = {}) {

    return xlsx2stream(file, { json: false }).pipe(stringify(options))
}

export function xlsx2json(file) {

    return xlsx2stream(file, { json: true }).pipe(new Transform({
        objectMode: true,
        construct(callback) {
            this.first = true
            this.push('[\n')
            callback()
        },
        transform(chunk, encoding, callback) {
            const json = JSON.stringify(chunk)
            if (this.first) {
                callback(null, `${json}`)
                this.first = false
            } else {
                callback(null, `,\n${json}`)
            }
        },
        flush(callback) {
            this.push('\n]\n')
            callback()
        },
    }))

}
