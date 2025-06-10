# React Workspace (`react-workspace`)

This package contains a React application that serves as a consumer for the web components built in the `stencil-library`.

## Purpose

*   Demonstrates how to integrate and use Stencil.js web components within a React application.
*   Provides a testbed for components from `stencil-library` in a React environment.

## Development

### Run the React Application

To serve the React application in development mode:
```bash
npm run start
```
This will typically start a dev server at `http://localhost:3000/`.

Alternatively, from the root of the monorepo:
```bash
npm run serve:react
```

### Build the React Application

To build the React application for production:
```bash
npm run build
```
The build artifacts will be stored in the `build/` directory within this package.

## Using Stencil Components in React

Integrating Stencil components into React involves a few key steps:

1.  **Define Custom Elements:**
    The `defineCustomElements` function, exported by the Stencil library's loader (`stencil-library/loader`), must be called to register the web components with the browser. This is typically done once during application startup, for example, in `src/index.tsx`:
    ```typescript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import { defineCustomElements } from 'stencil-library/loader';

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    defineCustomElements(window);
    ```

2.  **Import and Use Components:**
    The `stencil-library` is configured with a `reactOutputTarget` in its `stencil.config.ts`. This target generates React-specific wrapper components that make it easy to use the Stencil components in a React application, providing proper types and event handling.

    These wrapper components are typically generated in a path like `stencil-library/dist/react`. You can then import them into your React components:
    ```typescript
    // Example in src/App.tsx
    import React from 'react';
    import { MyButton } from 'stencil-library/dist/react'; // Adjust path if needed

    function App() {
      return (
        <div>
          <MyButton text="Click Me" />
        </div>
      );
    }

    export default App;
    ```
    The exact import path `stencil-library/dist/react` depends on how the `reactOutputTarget` is configured in `stencil.config.ts` (specifically the `proxiesFile` option) and how your monorepo and TypeScript path mappings are set up. The `stencil.config.ts` is configured with `proxiesFile: '../react-workspace/component-library/src/components/stencil-generated/index.ts'`. This means the generated React components are intended to be placed inside the React workspace itself, which can then be directly imported.

    If using the generated proxy files as configured, the import would look more like:
    ```typescript
    // Assuming 'component-library/src/components/stencil-generated' is accessible
    // via TypeScript path mapping or relative paths
    import { MyButton } from './components/stencil-generated'; // or from a path alias
    ```
    For the current project, the `stencil-library/dist/react` path is the more direct way if the `componentCorePackage` in `reactOutputTarget` is set to `stencil-library` and the `proxiesFile` points to where these components are consumed/re-exported from within the React app's structure. The example `App.tsx` uses `import { MyButton } from 'stencil-library/dist/react';`.

3.  **TypeScript Configuration:**
    Ensure your `tsconfig.json` in the React workspace is set up to correctly resolve modules from `stencil-library`, particularly if you are using path aliases or if the `stencil-library` is linked via Lerna. The `jsx` compiler option should also be compatible (e.g., `react-jsx`).

By following these steps, Stencil web components can be seamlessly integrated into a React application, leveraging the benefits of both Stencil's component model and React's ecosystem.
