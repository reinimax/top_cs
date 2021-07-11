function collatz(n, step = 0) {
  console.log('Step ' + step + ': n = ' + n);
  if (n === 1) return step;

  if (n % 2 === 0) {
    return collatz(n / 2, ++step);
  } else {
    return collatz(n * 3 + 1, ++step);
  }
}
