
import xlsx from '@ailnaf/xlsx2csv'
import { stringify } from 'csv-stringify'
import { Readable, Transform } from 'stream'

class XLSXReadable extends Readable {

    constructor(file, options = {}) {
        super({
            objectMode: true,
        })

        const { json = false } = options

        let header = undefined

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
        .then(() => {
            this.push(null)
        })
        .catch((e) => this.destroy(e))
    }

    _read(size) {
    }
}

export default function xlsx2stream(file, options = {}) {

    return new XLSXReadable(file, options)
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
