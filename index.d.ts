
type Xlsx2streamOption = {
    json: boolean,
}

export default function xlsx2stream(file: string, options?:Xlsx2streamOption) : ReadableStream

export function xlsx2json(file: string) : ReadableStream

export function xlsx2json(file: string) : ReadableStream
