// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  rules: {
    'ts/explicit-function-return-type': 'warn',
  },
  ignores: ['src/examples/*', '**/*.json'],
})
