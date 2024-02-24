# JP Morgan Application

# Overview

This application is a demonstration of fetching data and returning it to users in a sorted grid. It makes use of the following tech stack

- Vite (React + TypeScript)
- MSW (Mock Service Worker - stubbing out endpoint data)
- Tanstack Query (React Query - promise based state library used for fetching, caching and reloading endpoint data)
- AG Grid (Grid library for displaying data)
- Cypress (E2E Testing)
- Vitest (Vite replacement for Jest)
- React Testing Library (Unit Testing)

## Getting Started

To get started, clone the repository and run the following commands

```bash
npm install
npm run dev
```

## Testing

To run the tests, run the following command

```bash
npm run test
```

To Run cypress tests in a browser, run the following command, then select e2e then chrome

```bash
npm run cypress:open
```

## Requirements

Build a single page application that represents a table of financial instruments.
The table should have the following capabilities:

- Sorting

  - by “Asset Class”: Commodities first, then Equities and Credit last.
  - by “Price” in descending order
  - by “Ticker” in alphabetical order

- Presentation
  - Rows to be colour-coded by “Asset Class”:
    - Commodities = White
    - Equities = Blue
    - Credit = Green
  - “Price” should be in blue if positive and red if negative

You may assume an API exists which presents financial instrument data in the following JSON-encoded format:

```json
[
  {
    "ticker": "ALPHA",
    "price": 3150.67,
    "assetClass": "Credit"
  },
  {
    "ticker": "BETA",
    "price": 3791.37,
    "assetClass": "Equities"
  }
]
```
