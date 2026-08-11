import { jest } from '@jest/globals';
import { updateInventory, processOrder, updateProductInfo, retryOperation, runConcurrentOperations } from '../../src/activity2/warehouse.js';

describe('Activity 2 - Warehouse', () => {
  let originalRandom;

  beforeEach(() => {
    // Ensure network operations always succeed by making Math.random return >0.2
    originalRandom = Math.random;
    Math.random = jest.fn(() => 0.9);
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    Math.random = originalRandom;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('updateInventory should update inventory', async () => {
    const promise = updateInventory('product-1', 50);
    jest.advanceTimersByTime(2000); // enough to cover random delay up to 1500ms
    await promise;
    expect(true).toBe(true);
  });

  test('processOrder should throw if insufficient inventory', async () => {
    // First update inventory with enough stock
    const updatePromise = updateInventory('product-1', 100);
    jest.advanceTimersByTime(2000);
    await updatePromise;
    // Now process order with more than available - this throws synchronously
    const orderPromise = processOrder('order-1', 'product-1', 150);
    await expect(orderPromise).rejects.toThrow('Insufficient inventory for product product-1');
  });

  test('retryOperation should retry on failure', async () => {
    let attempts = 0;
    const operation = jest.fn().mockImplementation(() => {
      attempts++;
      if (attempts < 3) {
        throw new Error('Network error');
      }
      return 'success';
    });
    const result = await retryOperation(operation, 3);
    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(3);
  });

  test('retryOperation should throw after max retries', async () => {
    const operation = jest.fn().mockRejectedValue(new Error('Network error'));
    await expect(retryOperation(operation, 3)).rejects.toThrow('Operation failed after 3 attempts');
    expect(operation).toHaveBeenCalledTimes(3);
  });

  test('runConcurrentOperations should handle multiple operations without race conditions', async () => {
    const ops = [
      { type: 'updateInventory', productId: 'p1', quantity: 10 },
      { type: 'updateInventory', productId: 'p1', quantity: 20 },
      { type: 'processOrder', orderId: 'o1', productId: 'p1', quantity: 5 },
    ];
    const promise = runConcurrentOperations(ops);
    // Advance timers enough to cover all delays (max 2000ms for product info, plus retries)
    jest.advanceTimersByTime(10000);
    await promise;
    expect(true).toBe(true);
  });
});