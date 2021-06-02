module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      "node": {
        "paths": [
          "src",
          "public",
        ]
      }
    }
  },
  extends: [
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "jsx-a11y",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-key": "off",
    "max-len": ["warn", { code: 80, ignoreComments: true, ignoreUrls: true }],
    '@typescript-eslint/indent': ['error', 2],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        "labelAttributes": [
          "label"
        ],
        "depth": 3
      }
    ],
    "react/no-danger": "off",
    "no-plusplus": "off",
    "arrow-body-style": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": 0,
    "import/prefer-default-export": 0,
    "no-extra-boolean-cast": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", ".tsx"]
      }
    ],
    "no-alert": 0,
    "import/order": [
      "error",
      {
        "newlines-between": "always",
      }
    ],
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    'react/react-in-jsx-scope': 0,

    // Temporary off.
    "react/sort-comp": 0,
    "no-console": 0,
    "react/jsx-props-no-multi-spaces": 0,
    "react/state-in-constructor": 0,
    "react/static-property-placement": 0,
  },
};