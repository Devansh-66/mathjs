export const kurtosisDocs = {
  name: 'kurtosis',
  category: 'Statistics',
  syntax: [
    'kurtosis(A)',
    'kurtosis(A, normalization)'
  ],
  description: 'Compute the excess kurtosis of a dataset.',
  examples: [
    'kurtosis([2, 4, 4, 4, 5, 5, 7, 9])',
    'kurtosis([1, 2, 3, 4], "uncorrected")',
    'kurtosis([1, 2, 3, 4], "biased")'
  ],
  seealso: [
    'mean',
    'variance',
    'std'
  ]
}
