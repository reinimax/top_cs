function beer(n) {
  if (n === 0) {
    console.log('no more bottles of beer on the wall');
    return;
  } else {
    console.log(n + ' bottles of beer on the wall');
    return beer(n - 1);
  }
}
