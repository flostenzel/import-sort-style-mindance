# import-sort-style-mindance

Sensible [import sorting](https://github.com/renke/import-sort/) style for React Native projects.

## Usage

### Installation

```
npm install --save-dev import-sort-cli import-sort-style-mindance
```

### Setup

Add the following to your `package.json`:

```json
"importSort": {
  ".js, .jsx": {
    "parser": "babylon",
    "style": "mindance"
  }
}
```

### Typescript

You can use a different parser for Typescript files. More info [here](https://github.com/renke/import-sort#using-a-different-style-or-parser).

```
npm install --save-dev import-sort-parser-typescript
```

Add this to your `package.json`:

```diff
"importSort": {
  ".js, .jsx": {
    "parser": "babylon",
    "style": "mindance"
  },
+ ".ts, .tsx": {
+   "parser": "typescript",
+   "style": "mindance"
+ }
}
```

## Style

```javascript
// Modules with side effects (not sorted internally because order may matter)
import 'c';
import 'a';

// React (Native) modules
import React from 'react';
import { Text, ... } from 'react-native';

// Node.js modules
import { readFile } from 'fs';

// Installed modules
import axios from 'axios';

// "External" project modules ("../")
// "Internal" project modules ("./")
import Divider from '../components/Divider';
import Bubble from './Bubble';

// Custom styles
// Custom constants
// Custom types
// Resource files (.png, .jpg, .jpeg, .svg)
import shadow from '../styles/base' ;
import MD_GREEN from '../constants/base' ;
import type SESSION from '../types';
import image from '**/foo.png'

```

### References

- https://github.com/renke/import-sort/tree/master/packages/import-sort-style-module
- https://github.com/pietile/import-sort-style-pietile
- https://github.com/nictar/import-sort-order-rn