// https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e
import { Ord, contramap, getDualOrd, min, ordNumber } from 'fp-ts/lib/Ord'
import { User, users, logger } from './utils'
const log = logger('ord')

const byAge = contramap(({ age }: User) => age)(ordNumber)
log('byAge', users.sort(byAge.compare))

const getYounger = min(byAge)
log('getYounger', getYounger(users[0], users[1]))
log('getYounger', getYounger(users[1], users[0])) // same as ^

const max = <A>(ord: Ord<A>): ((a: A, b: A) => A) => min(getDualOrd(ord))
const getOlder = max(byAge)

log('getOlder', getOlder(users[0], users[1]))
log('getOlder', getOlder(users[1], users[0])) // same as ^
