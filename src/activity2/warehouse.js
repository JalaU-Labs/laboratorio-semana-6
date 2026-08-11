// Simulated inventory and product info storage.
const inventory = {};
const productInfo = {};

// Queue for managing updates per product to avoid race conditions.
const updateQueues = {};

// Helper to generate random delay between min and max ms.
function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simulate network request with possible failure.
function simulateNetwork(operation, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly fail with 20% probability to test retries.
      if (Math.random() < 0.2) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, delay);
  });
}

// Update inventory for a product.
export async function updateInventory(productId, quantity) {
  const delay = randomDelay(500, 1500);
  await simulateNetwork('updateInventory', delay);
  if (!inventory[productId]) {
    inventory[productId] = 0;
  }
  inventory[productId] += quantity;
  console.log(`[${new Date().toISOString()}] Inventory updated: ${productId} +${quantity} -> ${inventory[productId]}`);
}

// Process an order.
export async function processOrder(orderId, productId, quantity) {
  // Check inventory before processing.
  if (!inventory[productId] || inventory[productId] < quantity) {
    throw new Error(`Insufficient inventory for product ${productId} (need ${quantity}, have ${inventory[productId] || 0})`);
  }
  // Simulate processing delay.
  const delay = randomDelay(500, 1500);
  await simulateNetwork('processOrder', delay);
  // Update inventory by deducting quantity.
  inventory[productId] -= quantity;
  console.log(`[${new Date().toISOString()}] Order ${orderId} processed: ${productId} -${quantity} -> ${inventory[productId]}`);
  return { orderId, productId, quantity, status: 'processed' };
}

// Update product information.
export async function updateProductInfo(productId, info) {
  const delay = randomDelay(1000, 2000);
  await simulateNetwork('updateProductInfo', delay);
  productInfo[productId] = { ...productInfo[productId], ...info };
  console.log(`[${new Date().toISOString()}] Product info updated: ${productId}`, productInfo[productId]);
}

// Retry an operation up to maxRetries times.
export async function retryOperation(operation, maxRetries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.log(`[${new Date().toISOString()}] Attempt ${attempt} failed: ${error.message}. Retrying...`);
      if (attempt === maxRetries) {
        throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
      }
    }
  }
}

// Execute multiple operations concurrently with a queue per product to avoid race conditions.
// This function enqueues updates for the same product sequentially.
export async function runConcurrentOperations(operations) {
  const productQueues = {};

  // Helper to enqueue a promise for a product.
  function enqueue(productId, task) {
    if (!productQueues[productId]) {
      productQueues[productId] = Promise.resolve();
    }
    const queue = productQueues[productId];
    const next = queue.then(() => task());
    productQueues[productId] = next.catch(() => {}); // Continue chain even on error.
    return next;
  }

  // Execute each operation with appropriate concurrency.
  const promises = operations.map(op => {
    if (op.type === 'updateInventory') {
      return retryOperation(() => enqueue(op.productId, () => updateInventory(op.productId, op.quantity)));
    } else if (op.type === 'processOrder') {
      return retryOperation(() => enqueue(op.productId, () => processOrder(op.orderId, op.productId, op.quantity)));
    } else if (op.type === 'updateProductInfo') {
      return retryOperation(() => enqueue(op.productId, () => updateProductInfo(op.productId, op.info)));
    } else {
      return Promise.reject(new Error('Unknown operation type'));
    }
  });

  await Promise.all(promises);
  console.log('[%s] All operations completed.', new Date().toISOString());
  return { inventory, productInfo };
}