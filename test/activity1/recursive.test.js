import { contains, removeDuplicates, recursiveBubbleSort } from '../../src/activity1/recursive.js';

describe('Activity 1 - Recursion', () => {
  test('contains should return true if value exists in array', () => {
    const arr = [1, 2, 3, 4];
    expect(contains(arr, 3, 3)).toBe(true);
    expect(contains(arr, 5, 3)).toBe(false);
    expect(contains(arr, 1, 0)).toBe(true);
    expect(contains([], 1, -1)).toBe(false);
  });

  test('removeDuplicates should remove duplicates', () => {
    const arr = [1, 2, 2, 3, 4, 3, 5];
    const result = removeDuplicates(arr);
    // Check that all elements are unique and length is correct
    expect(result).toHaveLength(5);
    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    // Check that there are no duplicates
    const set = new Set(result);
    expect(set.size).toBe(result.length);
    // Should not mutate original
    expect(arr).toEqual([1, 2, 2, 3, 4, 3, 5]);
    expect(removeDuplicates([])).toEqual([]);
  });

  test('recursiveBubbleSort should sort array in ascending order', () => {
    const arr = [3, 1, 4, 2];
    const sorted = recursiveBubbleSort(arr);
    expect(sorted).toEqual([1, 2, 3, 4]);
    // Should sort in place
    expect(arr).toEqual([1, 2, 3, 4]);
    expect(recursiveBubbleSort([])).toEqual([]);
    expect(recursiveBubbleSort([1])).toEqual([1]);
  });
});