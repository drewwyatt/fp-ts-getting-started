// https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3
import { getEq } from 'fp-ts/lib/Array'
import { Eq, getStructEq, eqNumber, contramap } from 'fp-ts/lib/Eq'
import type { User } from './utils'

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a: A, as: Array<A>) => as.some(b => E.equals(a, b))
}

console.log(elem(eqNumber)(1, [1, 2, 3, 4]))
console.log(elem(eqNumber)(2, [2, 2, 3, 4]))

// getStructEq

type Point = {
  x: number
  y: number
}

const eqPoint: Eq<Point> = getStructEq({ x: eqNumber, y: eqNumber })

console.log('eqPoint', eqPoint.equals({ x: 1, y: 2 }, { y: 2, x: 1 }))
console.log('eqPoint', eqPoint.equals({ x: 1, y: 2 }, { y: 3, x: 1 }))

type Vector = {
  from: Point
  to: Point
}

const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint,
})

console.log(
  'eqVector',
  eqVector.equals(
    { from: { x: 1, y: 2 }, to: { y: 2, x: 1 } },
    {
      from: { x: 1, y: 2 },
      to: { y: 2, x: 1 },
    },
  ),
)

// getEq

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)
console.log('eqArrayOfPoints', eqArrayOfPoints.equals([], []))
console.log('eqArrayOfPoints', eqArrayOfPoints.equals([{ x: 1, y: 2 }], [{ x: 1, y: 2 }]))
console.log('eqArrayOfPoints', eqArrayOfPoints.equals([{ x: 1, y: 2 }], [{ x: 2, y: 1 }]))

// contramap

const eqUser = contramap((user: User) => user.userId)(eqNumber)

eqUser.equals(
  { userId: 1, name: 'Giulio', age: 7 },
  { userId: 1, name: 'Giulio Canti', age: 7 },
) // true
eqUser.equals(
  { userId: 1, name: 'Giulio', age: 7 },
  { userId: 2, name: 'Giulio', age: 7 },
) // false
