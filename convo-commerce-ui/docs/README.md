# Documentation

## Table Of Contents

- [Documentation](#documentation)
  - [Table Of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Overview](#overview)
    - [Quickstart](#quickstart)
    - [Building & Deploying](#building--deploying)
    - [Folder Structure](#folder-structure)
    - [Styling](#styling)
    - [Javascript](#javascript)
    - [Testing](#testing)
    - [Linting & Formating](#linting--formating)
    - [Automation](#automation)
    - [Routing](#routing)
    - [Talisman](#talisman)
    - [Environment Variables](#environment-variables)
    - [Dockerization](#dockerization)
    - [Lighthouse](#lighthouse)
    - [Removing Features](#removing-features)

## Prerequisites

- [Node](https://nodejs.org/en/)
- Package Manager ([npm](https://docs.npmjs.com/about-npm) / [yarn](https://yarnpkg.com/))

## Overview

### Quickstart

1. First, lets clone the application in your local machine

    ```Shell
    git clone git@github.com:twCatalyst/ondc-poc.git
    ```

2. First, install the dependencies and run the react client.

    ```Shell
    cd <your project folder>
    yarn install
    yarn workspace client start
    ```

3. Open [localhost:3000](http://localhost:3000/)
4. Edit the file at `./packages/client/src/index.tsx` and see the feedback immediately reflecting on UI.

### Building & Deploying

1. Run `yarn workspace client build`, which will compile all the necessary files to the
    `packages/client/dist` folder.

2. Upload the contents of the `build` folder to your web server's root folder. Alternative, this can be uploaded to AWS s3 bucket and served using cloudfront distribution.

### Folder Structure

The [`src/`](../../../tree/main/src) directory contains your entire application code, including CSS,
JavaScript, HTML and Tests.

The folder structure is similar to that of the one used in Next.js project. This helps us to clearly differentiate between components and pages.
And allows us to implement routing and route splitting in future.
Also uses Monorepository which will manage multiple repositories, you keep all your isolated code parts inside one repository.
The rest of the folders and files only exist to make your life easier, and
should not need to be touched.

See the [Folder Structure documentation](./folder-structure/README.md) for more information.

_(If they do have to be changed, please [submit an issue](https://github.com/react-boilerplate/react-boilerplate/issues)!)_

### Styling

SCSS / SASS is used as the default CSS workflow as it can be used in both small and large scale projects without much effort.

See the [Styling documentation](./styling/README.md) for more information.

### Javascript

We bundle all your client-side scripts and chunk them into several files using
code splitting where possible. We then automatically optimize your code when
building for production.

### Testing

For a thorough explanation of the testing procedure, see the
[testing documentation](./testing/README.md)!

### Linting & Formating

We rely heavily on [ESLint](https://eslint.org/) for linting and make use of [Airbnb](https://airbnb.io/javascript/) for a consistent code style. [Prettier](https://prettier.io/) is also integrated with ESLint to provide automatic formating.

### Automation

We use [Husky](https://typicode.github.io/husky) to run various checks pre-commit to ensure the code quality and stability of a commit.

### Routing

We use [react-router](https://reactrouter.com/) to navigate between the components and urls.

See the [routing documentation](./routing/README.md) for more information.

### Talisman

We use [talisman](https://github.com/thoughtworks/talisman) to validate the secrets and sensitive information being pushed into the git.

See the [talisman documentation](./talisman/README.md) for more information.

### Environment Variables

By default we have 2 webpack configurations for different build environments, specifically development and production. If you would like to have extra build
environments, all you will need to do is create a new webpack configuration under the `packages/client/config/` folder and hook it up with the webpack cli commands in `packages/client/package.json`.

For multiple staging environments, pass a custom environment variable when running webpack using `CUSTOM_ENV`

Example: `CUSTOM_ENV=staging NODE_ENV=production webpack --config packages/client/config/webpack.config.js`

See the [webpack documentation](./webpack/README.md) for more information.

### Dockerization

We use [docker](https://www.docker.com/) to containarize the react-app and its dependent services.

See the [dockerization documentation](./dockerization/README.md) for more information.

### Lighthouse

We are using [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci/) from Google to setup and run [Lighthouse](https://github.com/GoogleChrome/lighthouse).

See the [lighthouse documentation](./lighthouse/README.md) for more information.

### Removing Features

We are giving documentation for removing some of the features of ui-react-starter.
In ui-react-starter you can remove and update most of the features, but we recommend not to remove features which are not documented.

Features you can remove :

1. Redux
    - Follow [Redux documentation](removing-features/redux/README.md) to remove [redux](https://redux.js.org/) from ui-react-starter
2. SCSS
    - Follow [SCSS documentation](removing-features/scss/README.md) to remove [scss](https://sass-lang.com/guide) from ui-react-starter
3. Mock-server
    - Remove `packages/mock-server` folder from ui-react-starter to remove [mock-server](http://www.mbtest.org/)
4. Kubernetes
    - Remove `kubernetes` folder from ui-react-starter to remove [kubernetes](https://kubernetes.io/docs/home/)
