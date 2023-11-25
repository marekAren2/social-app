module.exports = {
  //plugins: ['jquery'], komentarz 20231125 dla react warsztaty
  //extends: ['eslint:recommended', 'plugin:jquery/recommended'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Zachowaj wszystkie reguły, które chcesz używać
    // Na przykład:
    'prefer-arrow-callback': 'off',
    'prettier/prettier': 'off',
    'jquery/no-ajax': 'warn',
    'jquery/no-animate': 'warn',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'error',
    'quotes': 'off',
    'linebreak-style': 'off',
    'indent': 'warn',
    'no-multiple-empty-lines': 'warn',
    'prefer-const': 'warn',
    'eol-last': 'warn',
    'no-console': 'off',
    'quote-props': 'warn',
    'comma-spacing': 'warn',
    'semi': 'warn',
    'object-curly-spacing': 'warn',
    'no-trailing-spaces': 'warn',
    'key-spacing': 'warn',
    'max-len': 'OFF',
	//'max-len': 'warn',
    'spaced-comment': 'warn',
    'no-restricted-syntax': 'warn',
    'no-unreachable-loop': 'warn',
    'prefer-template': 'warn',
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'space-infix-ops': 'warn',
    'no-tabs': 'warn',
	//'padded-blocks': ['warn', { 'allowSingleLineBlocks': true }],
	'padded-blocks': 'off'
	  },
};
