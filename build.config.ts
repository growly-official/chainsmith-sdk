import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  declaration: 'node16',
  clean: true,
  rollup: {
    inlineDependencies: ['@antfu/utils'],
  },
  failOnWarn: false,
});
