// from: https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
export function romanize (num) {
  if (isNaN(num)) return NaN
  const digits = String(+num).split('')
  const key = [
    '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX',
    'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'
  ]
  let roman = ''
  let i = 3
  while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman
  return Array(+digits.join('') + 1).join('M') + roman
}

export const snakeCase = str => str.split(' ').join('_')
export const desnakeCase = str => str.split('_').join(' ')
