function palindrome(string) {
  // consider empty and one letter strings as palindromes
  if (string.length <= 1) {
    return true;
  } else {
    if (string.charAt(0) === string.charAt(string.length - 1)) {
      return palindrome(string.slice(1, string.length - 1));
    } else {
      return false;
    }
  }
}
