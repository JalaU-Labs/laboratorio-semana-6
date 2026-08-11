# Activity 1: Recursion in JavaScript

## Overview

This activity focuses on implementing recursive functions to remove duplicates from an array and to perform bubble sort. The goal is to practice breaking down problems into smaller subproblems and solving them recursively.

## Implementation Details

### removeDuplicates(arr)

The function `removeDuplicates` takes an array of numbers and returns a new array with all duplicate numbers removed. It uses a helper function `contains(arr, val, index)` that checks whether `val` exists in `arr` from the start up to the specified index.

The algorithm works as follows:
- If the array is empty, return an empty array.
- Take the first element, recursively remove duplicates from the rest of the array.
- If the first element is already present in the deduplicated rest (using `contains`), skip it; otherwise, include it.

### recursiveBubbleSort(arr, n)

This function sorts the array in ascending order using the bubble sort algorithm implemented recursively. It performs a single pass that bubbles the largest element to the end, then recursively sorts the remaining `n-1` elements.

## Recursion Principles

- **Base case**: The recursion stops when the array is empty or when `n <= 1`.
- **Recursive step**: The problem is reduced to a smaller instance (e.g., removing duplicates from the rest, or sorting the first `n-1` elements).

## Testing

The functions are thoroughly tested with various cases, including empty arrays, arrays with duplicates, and arrays already sorted.

## Limitations

Both algorithms have O(n^2) time complexity, but they serve as educational tools for understanding recursion.
