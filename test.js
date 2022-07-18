
import xlsx2stream from './index.js'

xlsx2stream(process.argv[2])
.on('data', console.log)
.on('end', () => console.log('end'))
