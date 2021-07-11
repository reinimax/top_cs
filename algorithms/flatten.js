function flatten(arr, flattened = []) {
  arr.forEach(element => {
    if (Array.isArray(element) === false) {
      flattened.push(element);
    } else {
      flatten(element, flattened);
    }
  });
  return flattened;
}
