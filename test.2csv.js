
import { xlsx2csv } from './index.js'

xlsx2csv(process.argv[2]).pipe(process.stdout)
