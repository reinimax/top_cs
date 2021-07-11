function mergesort(arr) {
  // base case
  if (arr.length <= 1) {
    return arr;
  } else {
    // divide the array in two halves
    let half = Math.floor(arr.length / 2);
    let arrA = arr.slice(0, half);
    let arrB = arr.slice(half);

    return merge(mergesort(arrA), mergesort(arrB));
  }
}

function merge(arrA, arrB) {
  let arrMerged = [];
  let pointerA = 0;
  let pointerB = 0;
  while (pointerA < arrA.length && pointerB < arrB.length) {
    if (arrA[pointerA] < arrB[pointerB]) {
      arrMerged.push(arrA[pointerA]);
      pointerA++;
    } else {
      arrMerged.push(arrB[pointerB]);
      pointerB++;
    }
  }
  let leftOverA = [];
  let leftOverB = [];
  for (let i = pointerA; i < arrA.length; i++) {
    leftOverA.push(arrA[i]);
  }
  for (let i = pointerB; i < arrB.length; i++) {
    leftOverB.push(arrB[i]);
  }

  return [...arrMerged, ...leftOverA, ...leftOverB];
}
