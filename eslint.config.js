import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginAstro from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

const airbnbQualityRules = {
  'prefer-const': 'error',
  'no-var': 'error',
  'no-unused-vars': 'off',
  'no-console': ['warn', { allow: ['warn', 'error'] }],

  'object-shorthand': ['error', 'always'],
  'quote-props': ['error', 'as-needed'],
  'prefer-template': 'error',
  'dot-notation': 'error',
  'no-useless-escape': 'error',

  'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
  'arrow-body-style': ['error', 'as-needed'],

  'no-duplicate-imports': 'error',

  camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
  'new-cap': ['error', { newIsCap: true, capIsNew: false }],
};

const typescriptRules = {
  ...tsPlugin.configs.recommended.rules,
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
};

export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/'],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...airbnbQualityRules,
      ...typescriptRules,
    },
  },

  ...eslintPluginAstro.configs.recommended,

  {
    files: ['**/*.astro'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...airbnbQualityRules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  prettierConfig,
];
