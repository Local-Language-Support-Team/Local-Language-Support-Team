# Styling

- [Styling](#styling)
  - [Overview](#overview)
  - [Resources](#resources)

## Overview

We are using SCSS via Webpack to implement styling in the basic application. However, this can easily be change by just adding a new webpack loader / plugin for your specific styling language and tooling (emotion, styled-components, less, etc).

By default, we have setup webpack to inject global SCSS variables into the application. The global SCSS files are located in `packages/client/src/scss/` folder and can be modified to include any SCSS.

The recommended CSS methodology to ensure maximum readability and maintainability is to use [BEM (Block Element Modifier)](http://getbem.com/) naming conventions.

## Resources

- [CSS Architecture with SASS, SMACSS, & BEM](https://itnext.io/css-architecture-with-sass-smacss-and-bem-cc618392c148)
- [SCSS & BEM, A perfect match](https://andrew-barnes.medium.com/bem-and-sass-a-perfect-match-5e48d9bc3894)
