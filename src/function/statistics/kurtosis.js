import { factory } from '../../utils/factory.js'

const name = 'kurtosis'

export const createKurtosis = factory(name, ['typed'], ({ typed }) => {

  function compute(arr, normalization = 'unbiased') {
    const n = arr.length
    const mean = arr.reduce((a, b) => a + b, 0) / n

    let m2 = 0, m4 = 0
    for (let x of arr) {
      const d = x - mean
      m2 += d * d
      m4 += d * d * d * d
    }

    m2 /= n
    m4 /= n

    if (m2 === 0) return NaN

    const g2 = m4 / (m2 * m2) - 3

    if (normalization === 'uncorrected') return g2

    if (normalization === 'biased') {
      return ((n - 1) / n) ** 2 * (m4 / (m2 * m2)) - 3
    }

    if (normalization === 'unbiased') {
      if (n < 4) throw new Error('n must be >= 4')
      return ((n - 1) / ((n - 2) * (n - 3))) * ((n + 1) * g2 + 6)
    }

    throw new Error('Unknown normalization')
  }

  return typed(name, {
    'Array': compute,
    'Array, string': compute,
    '...number': function (...args) {
      return compute(args)
    }
  })
})
