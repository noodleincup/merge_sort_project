# merge-sort

TypeScript implementation of `merge(collection_1, collection_2, collection_3)`:
merges three pre-sorted arrays into one ascending array **without** using any
built-in sort.

| Input          | Order      |
| -------------- | ---------- |
| `collection_1` | ascending  |
| `collection_2` | descending |
| `collection_3` | ascending  |

Time complexity is O(n1 + n2 + n3): a three-pointer merge in which the pointer
for the descending array walks backward from its end.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (developed on Node 24)
- npm (bundled with Node.js)

Check your versions:

```bash
node -v
npm -v
```

## Setup

From the project root, install the dependencies:

```bash
npm install
```

This installs the dev dependencies: `typescript`, `vitest`, `tsx` and `@types/node`.

## Run the code

Run the demo in `src/index.ts`:

```bash
npm start
```

Expected output:

```
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
```

To use the function elsewhere:

```ts
import { merge } from "./src/merge";

merge([1, 4, 7], [9, 6, 3], [2, 5, 8]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Run the unit tests

Tests use [Vitest](https://vitest.dev/) and are data-driven (`it.each` over a
table of cases in `test/merge.test.ts`).

```bash
npm test              # run once
npm run test:watch    # re-run on every file change
```

Run a single test by name:

```bash
npx vitest run -t "negative numbers"
```

### Add a test case

Append an object to the `cases` array in `test/merge.test.ts`:

```ts
{ name: "my case", c1: [1, 3], c2: [4, 2], c3: [], expected: [1, 2, 3, 4] },
```

## Type check

```bash
npm run typecheck
```

## Project structure

```
merge_sort/
├── src/
│   ├── merge.ts        # merge() implementation
│   └── index.ts        # runnable demo
├── test/
│   └── merge.test.ts   # data-driven unit tests
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm start`         | Run the demo (`src/index.ts`) |
| `npm test`          | Run unit tests once           |
| `npm run test:watch`| Run tests in watch mode       |
| `npm run typecheck` | Type-check with `tsc`         |
