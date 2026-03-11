# Repository Guidelines

## Project Structure & Module Organization
This project is a CRA-based React app customized with CRACO.

- `src/index.js`: app entry, Redux `Provider`, and router mounting.
- `src/router/index.js`: route definitions and route guards/loaders.
- `src/store/index.js`: Redux Toolkit store setup.
- `src/store/modules/*Store.js`: slice modules (for example `counterStore.js`).
- `src/Comment.js`, `src/App.js`: feature/component examples.
- `src/tsStudy/`: TypeScript practice files.
- `public/`: static assets and HTML template.

Use the `@` alias for imports from `src` (configured in `craco.config.cjs` and `jsconfig.json`), e.g. `import Comment from "@/Comment.js";`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm start`: run local dev server via `craco start` (default `http://localhost:3000`).
- `npm test`: run tests in watch mode via `craco test`.
- `npm run build`: create production build in `build/`.
- `npm run eject`: expose CRA internals (irreversible; avoid unless necessary).

## Coding Style & Naming Conventions
- Use functional React components and hooks.
- Prefer 2-space indentation and semicolons.
- Component files: `PascalCase` (`Comment.js`); utility/store module files: `camelCase` with clear suffixes (`counterStore.js`).
- Keep Redux slices focused; colocate related async thunks in the same module.
- Follow ESLint rules from `react-app` and `react-app/jest` (in `package.json`).

## Testing Guidelines
Testing stack is Jest + React Testing Library (`src/setupTests.js`).

- Test files should be named `*.test.js` (or `*.test.ts`) and live beside source files or under `src/__tests__/`.
- Prioritize tests for routing behavior, Redux reducers/actions, and async thunk flows.
- Run `npm test` before opening a PR.

## Commit & Pull Request Guidelines
Recent history uses short, descriptive commit messages (often Chinese), for example: `新增评论案例`, `学习redux-react用法、asyncThunk等操作`.

- Keep commits small and scoped to one change.
- Use clear, action-oriented summaries.
- PRs should include: purpose, changed paths, test steps/results, and screenshots for UI changes.
- Link related issue/task IDs when available.

## Security & Configuration Tips
- Do not commit secrets or real tokens; route auth examples rely on `localStorage`.
- Keep environment-specific values out of source and document required variables in the PR description.
