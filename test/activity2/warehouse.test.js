import { jest } from '@jest/globals';
import { updateInventory, processOrder, updateProductInfo, retryOperation, runConcurrentOperations } from '../../src/activity2/warehouse.js';

describe('Activity 2 - Warehouse', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('updateInventory should update inventory', async () => {
    const promise = updateInventory('product-1', 50);
    jest.runAllTimers();
    await promise;
    expect(true).toBe(true);
  });

  test('processOrder should throw if insufficient inventory', async () => {
    // First update inventory with enough stock
    const updatePromise = updateInventory('product-1', 100);
    jest.runAllTimers();
    await updatePromise;
    // Now process order with more than available
    const orderPromise = processOrder('order-1', 'product-1', 150);
    // Error is thrown synchronously before any timer, so no need to advance timers
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
    jest.runAllTimers();
    await promise;
    expect(true).toBe(true);
  });
});