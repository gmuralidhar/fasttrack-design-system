# Angular Workspace (`angular-workspace`)

This package contains an Angular application that serves as a consumer for the web components built in the `stencil-library`.

## Purpose

*   Demonstrates how to integrate and use Stencil.js web components within an Angular application.
*   Provides a testbed for components from `stencil-library` in an Angular environment.

## Development

### Run the Angular Application

To serve the Angular application in development mode:
```bash
npm run serve
```
This will typically start a dev server at `http://localhost:4200/`.

Alternatively, from the root of the monorepo:
```bash
npm run serve:angular
```

### Build the Angular Application

To build the Angular application for production:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory within this package.

## Using Stencil Components in Angular

Integrating Stencil components into Angular involves a few key steps:

1.  **Define Custom Elements:**
    The `defineCustomElements` function, exported by the Stencil library's loader (`stencil-library/loader`), must be called to register the web components with the browser. This is typically done once during application startup, for example, in `src/main.ts`:
    ```typescript
    import { defineCustomElements } from 'stencil-library/loader';
    // ... other imports

    bootstrapApplication(AppComponent, appConfig)
      .catch((err) => console.error(err));

    defineCustomElements(window);
    ```

2.  **Enable `CUSTOM_ELEMENTS_SCHEMA`:**
    To inform Angular that custom elements (like those from Stencil) will be used in templates, you need to add `CUSTOM_ELEMENTS_SCHEMA` to the schemas of your Angular modules or standalone components. For standalone components, this is typically done in `src/app/app.config.ts`:
    ```typescript
    import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    // ... other imports

    export const appConfig: ApplicationConfig = {
      providers: [ /* ... */ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this
    };
    ```
    For module-based applications, you would add it to the relevant `@NgModule` decorator's `schemas` array.

3.  **Use Components in Templates:**
    Once the above steps are done, you can use the Stencil components directly in your Angular component templates by their tag names (e.g., `<my-button text="Click Me"></my-button>`).

4.  **Stencil Output Target for Angular (Optional but Recommended):**
    The `stencil-library` is configured with an `angularOutputTarget` in its `stencil.config.ts`. This target generates Angular-specific proxy components. These proxies can provide better type checking and integration with Angular's forms and event handling. If these proxies are generated (e.g., into `projects/component-library/src/lib/stencil-generated` within the Angular workspace, as configured in `stencil.config.ts`), you might import and declare these proxy components instead of relying solely on `CUSTOM_ELEMENTS_SCHEMA` for all components. This setup is often handled by the output target's configuration.

    The current `stencil.config.ts` is set up to output these files to:
    *   `directivesProxyFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts'`
    *   `directivesArrayFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts'`

    These generated files would typically be part of a local Angular library module (`component-library` in this case) that you would then import into your main application. However, the base Angular project created by `ng new angular-app` does not automatically create a library structure like `projects/component-library`. For the proxy components to be used as configured, you would need to first generate such a library within the `angular-workspace` (e.g., using `ng generate library component-library`) and ensure the paths in `stencil.config.ts` correctly point to it.

    For simplicity, the current setup relies on `CUSTOM_ELEMENTS_SCHEMA` and `defineCustomElements` for basic component usage.
