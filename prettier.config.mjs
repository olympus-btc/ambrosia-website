/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  printWidth: 140,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
