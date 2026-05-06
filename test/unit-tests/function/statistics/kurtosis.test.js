import assert from 'assert'
import { approxEqual } from '../../../../tools/approx.js'
import math from '../../../../src/defaultInstance.js'

const k = math.kurtosis
const A = [2, 4, 4, 4, 5, 5, 7, 9]

describe('kurtosis', function () {

it('is exposed on the math namespace', function () {
assert.strictEqual(typeof math.kurtosis, 'function')
})

it('is discoverable via math.help', function () {
assert.strictEqual(math.help('kurtosis').doc.name, 'kurtosis')
})

it('default normalization is unbiased', function () {
assert.strictEqual(k(A), k(A, 'unbiased'))
})

it('accepts varargs signature equivalent to an array', function () {
assert.strictEqual(k(2, 4, 4, 4, 5, 5, 7, 9), k(A))
})

it('uncorrected mode numeric correctness', function () {
assert.strictEqual(k(A, 'uncorrected'), -0.21875)
assert.strictEqual(k([1, 2, 3, 4], 'uncorrected'), -1.36)
})

it('biased mode numeric correctness', function () {
approxEqual(k(A, 'biased'), -0.87060546875)
approxEqual(k([1, 2, 3, 4], 'biased'), -2.0775)
})

it('unbiased mode numeric correctness', function () {
approxEqual(k(A, 'unbiased'), -0.2098765432098766)
})

})
