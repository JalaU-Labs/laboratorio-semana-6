import { removeDuplicates, recursiveBubbleSort } from './activity1/recursive.js';
import { retryOperation, updateInventory, processOrder, updateProductInfo, runConcurrentOperations } from './activity2/warehouse.js';

// Example usage for activity 1
const arr = [3, 1, 2, 3, 2, 4, 5, 1];
const uniqueArr = removeDuplicates(arr);
console.log('Original:', arr);
console.log('Unique:', uniqueArr);
const sortedArr = recursiveBubbleSort(uniqueArr);
console.log('Sorted:', sortedArr);

// Example usage for activity 2
(async () => {
  try {
    const operations = [
      { type: 'updateInventory', productId: 'product-1', quantity: 50 },
      { type: 'processOrder', orderId: 'order-1', productId: 'product-1', quantity: 30 },
      { type: 'updateProductInfo', productId: 'product-1', info: { price: 15 } },
      { type: 'updateInventory', productId: 'product-2', quantity: 100 },
      { type: 'processOrder', orderId: 'order-2', productId: 'product-2', quantity: 50 },
      { type: 'updateProductInfo', productId: 'product-2', info: { description: 'Updated product 2' } },
    ];
    await runConcurrentOperations(operations);
  } catch (error) {
    console.error('Error in warehouse operations:', error);
  }
})();