// https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3
import type { Eq } from 'fp-ts/lib/Eq'

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a: A, as: Array<A>) => as.some(b => E.equals(a, b))
}

const eqNum: Eq<number> = {
  equals: (a, b) => a === b,
}

console.log(elem(eqNum)(1, [1, 2, 3, 4]))
console.log(elem(eqNum)(2, [2, 2, 3, 4]))
