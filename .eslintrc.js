module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "es6": true
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": [
        "./internals/**",
      ],
    }],
    "import/no-dynamic-require": 0,
    "import/no-webpack-loader-syntax": 0,
    "jsx-a11y/media-has-caption": 0,
    "no-loop-func": 0,
    "no-bitwise": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "no-script-url": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "react/sort-prop-types": "error",
    "react/jsx-sort-props": "error",
    "react/jsx-sort-default-props": "error",
    "linebreak-style": 0
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./internals/webpack/client/webpack.prod.babel.js"
      }
    }
  }
};
