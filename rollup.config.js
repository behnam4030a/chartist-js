import swc from 'rollup-plugin-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.js', '.ts', '.tsx'];
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_);
const plugins = targets => [
  nodeResolve({
    extensions
  }),
  swc({
    jsc: {
      parser: {
        syntax: 'typescript'
      },
      externalHelpers: true
    },
    env: {
      targets
    },
    module: {
      type: 'es6'
    },
    sourceMaps: true
  }),
  terser()
];

export default [
  {
    input: pkg.main,
    plugins: plugins('defaults, not ie 11, not ie_mob 11'),
    external,
    output: {
      file: pkg.publishConfig.main,
      format: 'umd',
      name: 'Chartist',
      exports: 'named',
      sourcemap: true
    }
  },
  {
    input: pkg.main,
    plugins: plugins('defaults and supports es6-module'),
    external,
    output: {
      file: pkg.publishConfig.module,
      format: 'es',
      sourcemap: true
    }
  },
  {
    input: pkg.main,
    plugins: plugins('defaults, not ie 11, not ie_mob 11'),
    external,
    output: {
      file: pkg.publishConfig.browser[pkg.publishConfig.main],
      format: 'iife',
      name: 'Chartist',
      exports: 'named',
      sourcemap: true
    }
  }
];