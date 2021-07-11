function bubblesort(arr) {
  const length = arr.length;
  let isSorted = false;

  // run the sort n - 1 times, where n = the length of the array
  for (let n = 0; n < length - 1; n++) {
    isSorted = true;
    // bubble sort the array
    for (let i = 0; i < length; i++) {
      if (arr[i] > arr[i + 1]) {
        let greater = arr.splice(i, 1);
        arr.splice(i + 1, 0, greater[0]);
        isSorted = false;
      }
    }
    console.log(n + 1 + ': ' + arr);
    if (isSorted) break;
  }

  return arr;
}
