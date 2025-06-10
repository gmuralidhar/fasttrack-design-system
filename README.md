# Monorepo Web Components with Stencil, Angular, and React

This project demonstrates a monorepo setup using Lerna for managing a Stencil.js component library and consuming it in both Angular and React applications.

## Project Structure

*   **`lerna.json`**: Configures Lerna for managing packages within the monorepo. Packages are located in the `packages/` directory.
*   **`packages/`**: Contains all the individual packages:
    *   **`stencil-library/`**: A Stencil.js project that builds a library of web components.
    *   **`angular-workspace/`**: An Angular CLI project that consumes components from `stencil-library`.
    *   **`react-workspace/`**: A Create React App project that also consumes components from `stencil-library`.

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (v9 or later recommended)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    Run the following command in the root directory of the monorepo. This will install dependencies for all packages and link local packages together.
    ```bash
    npm install
    ```

### Development Workflow

*   **Build all packages:**
    This command will build the Stencil library, then the Angular app, and then the React app.
    ```bash
    npm run build
    ```

*   **Run the Stencil component library dev server:**
    This will build the Stencil library and watch for changes, serving it typically on `http://localhost:3333/`.
    ```bash
    npm run serve:stencil
    ```
    (Alternatively, navigate to `packages/stencil-library` and run `npm start`)

*   **Run the Angular application:**
    This will serve the Angular application, typically on `http://localhost:4200/`.
    ```bash
    npm run serve:angular
    ```
    (Alternatively, navigate to `packages/angular-workspace` and run `npm run serve`)

*   **Run the React application:**
    This will serve the React application, typically on `http://localhost:3000/`.
    ```bash
    npm run serve:react
    ```
    (Alternatively, navigate to `packages/react-workspace` and run `npm start`)

*   **Run tests for all packages:**
    This command will execute tests in all packages that have a `test` script defined.
    ```bash
    npm run test
    ```

## How it Works

The Stencil library (`stencil-library`) is built first. Its `stencil.config.ts` is configured with output targets for Angular (`angularOutputTarget`) and React (`reactOutputTarget`). These targets generate proxy components/wrappers that make it easier to consume the Stencil web components in Angular and React ecosystems.

*   **Angular Integration**: The Angular workspace imports the generated components and uses `CUSTOM_ELEMENTS_SCHEMA` to allow Stencil's custom elements. The `defineCustomElements` function from the Stencil loader is called in `main.ts`.
*   **React Integration**: The React workspace imports components from `stencil-library/dist/react` and also calls `defineCustomElements` from the Stencil loader in `index.tsx`.

Lerna manages the dependencies between these packages, ensuring that `angular-workspace` and `react-workspace` can correctly resolve and use `stencil-library`.
