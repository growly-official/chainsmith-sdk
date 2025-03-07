// @ts-check
import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'lib',
  rules: {
    'ts/explicit-function-return-type': 'warn',
    'style/semi': 'off',
    'style/brace-style': 'off',
    'style/comma-dangle': 'off',
    'style/member-delimiter-style': 'off',
    'antfu/if-newline': 'off',
    'perfectionist/sort-imports': 'off',
    'style/arrow-parens': 'off'
  },
  ignores: ['src/examples/*', '**/*.json'],
});
