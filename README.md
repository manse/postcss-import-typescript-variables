# postcss-import-typescript-variables

Import variables written in typescript to postcss-simple-vars or postcss-advanced-variables, etc.

```
yarn add --dev postcss-import-typescript-variables
```

```ts
/* variables.ts*/

export const Color = {
  primary: 'red',
  primaryActive: 'magenta',
  secondary: 'blue'
};
export const Gutter = 8;
```

```js
/* webpack.config.js */

const variables = require('postcss-import-typescript-variables')({
  path: './src/constants/variables.ts'
});
const plugins = [
  require('postcss-simple-vars')({
    variables
  })
];
console.log(variables);
```

```js
/* terminal output */
{
  'color-primary': 'red',
  'color-primary-active': 'magenta',
  'color-secondary': 'blue',
  gutter: '8px'
}
```

MIT
