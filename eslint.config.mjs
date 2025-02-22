/* eslint-disable no-redeclare */
import globals from "globals";
import js from "@eslint/js";
import path from "node:path";
import sortImportsEs6Autofix from "eslint-plugin-sort-imports-es6-autofix";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/dist", "**/demo", "!**/.storybook", "!**/.jest"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "sort-imports-es6-autofix": sortImportsEs6Autofix,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },

    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "max-len": "off",
      "no-empty": "off",
      "jsx-a11y/alt-text": 0,
      "react-hooks/exhaustive-deps": 0,

      "sort-imports-es6-autofix/sort-imports-es6": [
        1,
        {
          ignoreCase: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
        },
      ],
    },
  },
];
