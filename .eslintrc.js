module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    ignorePatterns: [
        '**/node_modules/',
        '**/dist/',
        '**/*.test.js',
        '**/examples/*',
        '**/src/index.ts',
        '**/src/error.ts',
        '**/src/streaming.ts',
      ],
    rules: {
        "no-case-declarations": "warn",
        "no-console": "warn",
        "no-duplicate-imports": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "prefer-const": "error",
        "@typescript-eslint/no-explicit-any": "off",
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    }
};
