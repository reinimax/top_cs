roman_mapping = {
  1000: 'M',
  900: 'CM',
  500: 'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
};

function arabToRoman(n, result = '', left = 0) {
  if (roman_mapping[n]) {
    result += roman_mapping[n];
    if (left > 0) {
      // if a number fits, rerun the function with the rest
      return arabToRoman(left, result, 0);
    } else {
      return result;
    }
  } else {
    return arabToRoman(n - 1, result, ++left);
  }
}
