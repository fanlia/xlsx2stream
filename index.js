
import xlsx from '@ailnaf/xlsx2csv'
import { stringify } from 'csv-stringify'
import { Readable, Transform } from 'stream'

export default function xlsx2stream(file, options = {}) {

    const { json = false } = options

    let header = undefined

    return new Readable({
        objectMode: true,
        read() {
            xlsx(file, data => {
                if (json) {
                    if (header) {
                        this.push(header.reduce((m, d, i) => ({...m, [d]: data[i]}), {}))
                    } else {
                        header = data
                    }
                } else {
                    this.push(data)
                }
            })
            .then(() => this.push(null))
            .catch((e) => this.destroy(e))
        },
    })

}

export function xlsx2csv(file) {

    return xlsx2stream(file, { json: false }).pipe(stringify())
}

export function xlsx2json(file) {

    return xlsx2stream(file, { json: true }).pipe(new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const json = JSON.stringify(chunk)
            callback(null, `${json}\n`)
        },
    }))

}
