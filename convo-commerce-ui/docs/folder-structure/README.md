# Folder Structure

- [Folder Structure](#folder-structure)
  - [Overview](#overview)
  - [Folder specific details](#folder-specific-details)

## Overview

We are using a flattened hierarchy, with inspiration from [Next.js folder structure](https://nextjs.org/docs/routing/introduction). This allows us to implement dynamic routing and code splitting.

```
packages/
└── client/
    └── src/
        ├── docs/
        ├── fonts/
        ├── images/
        ├── types/
        ├── jest-config/
        ├── store/
        ├── components/
        ├── layouts/
        └── pages/
            ├── home/
            ├── dashboard/
            ├── user/
            └── auth/
                ├── login.tsx
                ├── logout.tsx
                └── register.tsx

```

## Folder specific details

- docs/
  - This is where we store all the documentation related to the app, generally this contains instructions for build setup as well as detailed notes on the architecture of the application (including important decisions and their reasons).
- fonts/
  - Place to store all the fonts (optional, feel free to determine your own location as long as you keep it inside `packages/client/src/` folder)
- images/
  - Place to store all the images (optional, feel free to determine your own location as long as you keep it inside `packages/client/src/` folder)
- types/
  - For declaring global types, for example image and miscelleneous file types etc so that typescript can understand them.
  - Please use relevant folders for declaring types within your application (example: type definition for props of `<HelloWorld />` component must be within the component's own folder)
- jest-config/
  - Setup jest tests as well as file mocks for jest. [Read more](https://archive.jestjs.io/docs/en/23.x/manual-mocks)
- store/
  - The global app state is stored in this folder
- components/
  - This folder contains all the individual components within the app, doesn't matter if they are only used once or not. This allows us to break apart our app's presentation view into reusable chunks that can be imported anywhere with in the app.
  - This folder can further be integrated with storybook and component specific documentation and tests can be added to improve code quality.
- pages/
  - This is the integration layer of the application so to speak. This is where we bring the logic from `store/` folder and UI from the `components/` and `layouts/` folder.
  - Our recommendation is to keep the folder hierarchy flattened (as in a page hosted at `/dashboard/userfeed/` would be located within the `pages/` folder independently as `userfeed/` folder)
