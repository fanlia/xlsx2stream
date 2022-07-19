# xlsx2stream

xlsx to stream

## Install

```sh
npm i xlsx2stream
```

## Usage

### esm

```javascript
import xlsx2stream, { xlsx2csv, xlsx2json } from 'xlsx2stream'

```

### cjs

```javascript
const { default: xlsx2stream, xlsx2csv, xlsx2json } = await import('xlsx2stream')
```

### nodejs

```javascript

const filename = 'data.xlsx'

xlsx2stream(filename)
.on('data', console.log)
.on('end', () => console.log('end'))

// to csv
xlsx2csv(filename).pipe(process.stdout)

// to json
xlsx2json(filename).pipe(process.stdout)

```

## Test

```sh
node test.js data.xlsx
```

## License

MIT
