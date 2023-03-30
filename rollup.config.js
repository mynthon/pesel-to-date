import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/pesel-to-date.js',
  output: [
    {
      file: 'build/mynthon.pesel-to-date.js',
      format: 'iife',
      name: 'net_mynthon_peselToDate',
      compact: true
    },
    {
      file: 'build/mynthon.pesel-to-date.min.js',
      format: 'iife',
      name: 'net_mynthon_peselToDate',
      compact: true,
      plugins: [
        terser()
      ]
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    })
  ],
  watch: {
    include: 'src/*.js'
  }
};
