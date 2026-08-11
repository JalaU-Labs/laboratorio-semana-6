# Week 6 Lab – Recursion, Concurrency & Generators

This repository contains the solution for the Week 6 laboratory assignments:

1. **Recursive functions** – remove duplicates and bubble sort.
2. **Warehouse management** – asynchronous operations, concurrency, and error handling.
3. **Research** – JavaScript generators (documentation only).

## Requirements

- Node.js v26.5.0 or later
- npm v12.0.1 or later

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/JalaU-Labs/laboratorio-semana-6.git
cd laboratorio-semana-6
npm install
```

## Usage

Run the example script that demonstrates both activities:

```bash
npm start
```

## Testing

Run all unit tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Project Structure

```
.
├── .docs/
│   ├── activity1.md          # Recursion explanation
│   ├── activity2.md          # Concurrency explanation
│   └── activity3.md          # Generators research (APA 7)
├── src/
│   ├── activity1/
│   │   └── recursive.js      # removeDuplicates & recursiveBubbleSort
│   ├── activity2/
│   │   └── warehouse.js      # inventory, orders, concurrency, retries
│   └── index.js              # demonstration entry point
├── test/
│   ├── activity1/
│   │   └── recursive.test.js
│   └── activity2/
│       └── warehouse.test.js
├── .gitignore
├── jest-config.js
├── LICENSE
├── package.json
└── README.md
```

## License

MIT © 2026 Diego Alejandro Botina Herrera