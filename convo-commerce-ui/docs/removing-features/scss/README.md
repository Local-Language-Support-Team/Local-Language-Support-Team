# Removing SCSS from ui-react-starter

- Remove `packages/client/src/scss` from ui-react-starter
- Change import of `packages/client/src/index.tsx` from style.scss to style.css

```js
import "./style.css";
```

- Remove following lines of code to remove scss loader webpackBaseRules from `packages/client/config/webpack.base.js`,

  ```json
    "resolve-url-loader",
      {
        loader: "sass-loader",
        options: {
          additionalData: '@import "./src/scss/index.css";',
          sourceMap: true,
        },
      },
  ```

- Remove following dependencies from `/packages/client/package.json`

  ```json
    "@storybook/preset-scss": "^1.0.3", 
  ```

- Remove following dependencies from `package.json`

  ```json
    "@storybook/preset-scss": "^1.0.3",  
  ```

- Change all files extension from .sccs to .css
- Change all .scss imports to .css
