import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const banner = `/*!
  * Bootstrap v4.6.5 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */`;

const BUNDLE = process.env.BUNDLE === 'true';

let fileDest = 'bootstrap.js'
const external = ['jquery', 'popper.js'];
const pluginsUnminified = [
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: [
      ['@babel/preset-env']
    ]
  })
];
const pluginsMinified = [
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: [
      ['@babel/preset-env']
    ]
  }),
  terser({
    mangle: true,
    compress: {
      passes: 2,
      typeofs: false
    },
    format: {
      comments: /^!/
    }
  })
];
const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
  'popper.js': 'Popper'
};

if (BUNDLE) {
  fileDest = 'bootstrap.bundle.js';
  // Remove last entry in external array to bundle Popper
  external.pop();
  delete globals['popper.js'];
  pluginsUnminified.push(resolve());
  pluginsMinified.push(resolve())
}

export default [
  // Non-minified version
  {
    input: 'vendors/custom/js/index.js',
    output: {
      file: `publish/dist/js/${fileDest}`,
      format: 'umd',
      name: 'bootstrap',
      banner: banner,
      sourcemap: true,
      globals
    },
    external,
    plugins: pluginsUnminified
  },
  // Minified version
  {
    input: 'vendors/custom/js/index.js',
    output: {
      file: `publish/dist/js/${fileDest.replace('.js', '.min.js')}`,
      format: 'umd',
      name: 'bootstrap',
      banner: banner,
      sourcemap: true,
      globals
    },
    external,
    plugins: pluginsMinified    
  }
];
