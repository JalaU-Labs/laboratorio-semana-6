// Helper function to check if a value exists in the array up to a given index.
export function contains(arr, val, index) {
  if (index < 0) {
    return false;
  }
  if (arr[index] === val) {
    return true;
  }
  return contains(arr, val, index - 1);
}

// Recursively remove duplicates from an array.
export function removeDuplicates(arr) {
  if (arr.length === 0) {
    return [];
  }
  const [first, ...rest] = arr;
  const restWithoutDuplicates = removeDuplicates(rest);
  if (contains(restWithoutDuplicates, first, restWithoutDuplicates.length - 1)) {
    return restWithoutDuplicates;
  }
  return [first, ...restWithoutDuplicates];
}

// Recursive bubble sort: performs a single pass and then recurses on the remaining unsorted part.
export function recursiveBubbleSort(arr, n = arr.length) {
  if (n <= 1) {
    return arr;
  }
  // Single pass: bubble the largest element to the end.
  function bubblePass(arr, i) {
    if (i >= n - 1) {
      return arr;
    }
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
    return bubblePass(arr, i + 1);
  }
  bubblePass(arr, 0);
  // Recursively sort the first n-1 elements.
  return recursiveBubbleSort(arr, n - 1);
}