
import { xlsx2json } from './index.js'

xlsx2json(process.argv[2]).pipe(process.stdout)
