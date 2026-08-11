# Activity 3: Research on JavaScript Generators

## Introduction

JavaScript generators are functions that can be paused and resumed, allowing for lazy evaluation and the production of sequences of values. They are defined using the `function*` syntax and use the `yield` keyword.

## Definition and Syntax

A generator function returns a Generator object, which conforms to both the iterable and iterator protocols. Unlike regular functions that run to completion, generators can yield multiple values over time.

### Regular vs Generator Functions

- Regular functions execute all statements sequentially and return a single value.
- Generator functions can pause execution at each `yield` expression and resume later, producing a series of values.

## Iterators and Generators

An iterator is an object that implements the `next()` method, which returns an object with `value` and `done` properties. Generators are a convenient way to create iterators.

### The `next()` Method

Calling `next()` on a generator executes the function until the next `yield`, returning the yielded value. Subsequent calls resume from that point.

## Use Cases and Benefits

- **Lazy sequences**: Generators can produce infinite sequences without consuming memory.
- **Asynchronous programming**: Before `async/await`, generators with Promises were used to manage asynchronous flows (e.g., using libraries like co).
- **State machines**: Generators can maintain internal state across yields.

## Advanced Topics

### Generator Delegation (`yield*`)

The `yield*` expression delegates iteration to another generator or iterable, allowing composition.

### Generators and Promises

Generators can yield Promises, and a runner function can resolve each promise and resume the generator, enabling synchronous-looking asynchronous code.

## References

Mozilla Developer Network. (2024). *Iterators and generators*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

Simpson, K. (2020). *You Don't Know JS: Async & Performance*. O'Reilly Media.

Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media.