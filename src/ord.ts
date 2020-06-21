// https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e
import { contramap, ordNumber } from 'fp-ts/lib/Ord'
import { User, users, logger } from './utils'
const log = logger('ord')

const byAge = contramap(({ age }: User) => age)(ordNumber)
log('byAge', users.sort(byAge.compare))
