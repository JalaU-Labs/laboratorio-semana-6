# Activity 2: Event Loop, Parallelism, and Concurrency in Warehouse Management

## Overview

This activity simulates a warehouse management system that handles inventory updates, order processing, and product information updates concurrently. It leverages JavaScript's event loop, promises, and concurrency control to manage multiple asynchronous operations without blocking.

## Key Concepts

### Asynchronous Operations

- **updateInventory(productId, quantity)**: Simulates a network request to update inventory with a random delay between 500ms and 1500ms.
- **processOrder(orderId, productId, quantity)**: Checks inventory sufficiency, processes the order, and updates inventory.
- **updateProductInfo(productId, info)**: Simulates updating product metadata with a random delay between 1000ms and 2000ms.

### Concurrency and Race Conditions

To prevent race conditions when multiple operations target the same product, a per-product queue is implemented. Operations for the same product are executed sequentially, while operations for different products run concurrently.

### Error Handling and Retries

Each operation is wrapped with a retry mechanism (`retryOperation`) that attempts the operation up to three times before failing. Network errors are simulated with a 20% failure rate.

### Logging

All operations log their start and completion with timestamps to provide visibility into the execution flow.

## Implementation

The `runConcurrentOperations` function accepts an array of operation descriptors and runs them concurrently using `Promise.all`, while respecting per-product ordering via queues.

## Testing

Tests use Jest with fake timers to simulate delays and verify retry logic and concurrency control.

## Execution Evidence

The following screenshots demonstrate the concurrent warehouse operations and test coverage.

- **Execution**: `activity2-execution.png` shows the logs from running the warehouse operations, including inventory updates, order processing, and retry attempts.
- **Coverage**: `activity2-coverage.png` shows the Jest coverage report for Activity 2, covering the warehouse module.