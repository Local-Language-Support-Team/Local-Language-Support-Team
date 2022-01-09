# Lighthouse

- [Lighthouse](#lighthouse)
  - [Overview](#overview)

## Overview

We are currently using the default Lighthouse configurations for both mobile and desktop views using the `preset` [option](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#preset) available via the [lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md). Both the configurations can be found inside the `packages/client/lighthouse/` folder located in the root of the repository. Default configuration files for both mobile and desktop views are `lighthouse-default.config.js` and `lighthouse-default.config.js`.

Github actions allows us to seemlessly use the Lighthouse configurations for both mobile and desktop views in two parallel jobs. The `lighthouse-mobile` and `lighthouse-desktop` jobs are defined in the `.github/workflows/lighthouse.yml` file.
