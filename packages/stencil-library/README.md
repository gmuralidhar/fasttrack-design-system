# Stencil Component Library (`stencil-library`)

This package contains the core web component library built with Stencil.js. These components are designed to be framework-agnostic and can be consumed by various JavaScript frameworks or directly in HTML.

## Purpose

The primary purpose of this package is to:
*   Define and implement reusable UI components (e.g., buttons, cards, modals).
*   Compile these components into standard Web Components.
*   Provide necessary output targets for easy integration with other frameworks like Angular and React.

## Development

### Build the Library

To build the component library once:
```bash
npm run build
```
This command compiles the Stencil components and generates output targets, including:
*   Standard web components in `dist/`.
*   Angular-specific proxies (configured in `stencil.config.ts`).
*   React-specific proxies (configured in `stencil.config.ts`).

### Run in Watch Mode (Development Server)

To build the library and watch for changes, with a development server:
```bash
npm run start
```
Alternatively, from the root of the monorepo:
```bash
npm run serve:stencil
```
This will typically start a dev server at `http://localhost:3333/`.

### Adding New Components

1.  **Generate a new component:**
    Use the Stencil CLI to generate a new component. Navigate to the `packages/stencil-library` directory and run:
    ```bash
    npm run generate
    ```
    Or, more directly:
    ```bash
    npx stencil generate
    ```
    Follow the prompts to name your component (e.g., `my-new-component`). This will create files like `src/components/my-new-component/my-new-component.tsx`.

2.  **Implement the component:**
    Develop your component's logic in the `.tsx` file and its styles in the `.css` file.

3.  **Export the component:**
    Ensure your new component is exported from `src/components.ts` if you are using such a file for centralized exports, although Stencil's build process will typically pick up components from the `src/components` directory automatically for the main `dist` outputs. For generated framework wrappers, ensure the component is correctly processed by the output target configurations in `stencil.config.ts`.

4.  **Build the library:**
    Run `npm run build` to include the new component in the library build.

5.  **Test and use:**
    Refer to the component in your consumer applications (Angular, React) or the local Stencil dev server. Remember to update the consumer applications if they rely on specific imports or generated files from the Stencil library.
