# 🏢 Companies Directory — React + MUI

A small, optimized React project using Material UI that demonstrates building a professional companies directory with modern frontend practices.


## ✨ Features
- 📡 **Mock API** with [`json-server`](https://github.com/typicode/json-server).
- 🔍 **Filtering** (search, location, industry).
- ↕️ **Sorting** by different fields.
- 📑 **Pagination** with fixed table size + sticky header.
- ⏳ **Loading / Error states** with skeleton UI, Suspense and Error Boundaries.
- ⚡ **Performance optimizations**:
  - `useMemo` for derived state.
  - `useCallback` for handlers.
  - `React.memo` for components.
  - Debounced search input.
  - Global state with `useReducer` + Context.
