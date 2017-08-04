import babel from 'rollup-plugin-babel'
// import uglify from 'rollup-plugin-uglify'
// import {minify} from 'uglify-es'
import resolve from 'rollup-plugin-node-resolve'

import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import visualizer from 'rollup-plugin-visualizer'

import babelrc from 'babelrc-rollup'

import fs from 'fs'
import path from 'path'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
    entry: 'src/examples/index.js',
    sourceMap: true,
    plugins: [
        resolve({
            browser: true,
            module: true
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: [
                 'node_modules/preact/**',
                 'node_modules/reactive-di/**',
                 'node_modules/lom_atom/**'
            ]
        }),
        sourcemaps(),
        babel(babelrc()),
        globals(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        visualizer({filename: path.join(__dirname, 'docs', 'stat.html') })
        // uglify({}, minify)
    ],
    targets: [
        {dest: pkg['iife:main'], format: 'iife', moduleName: pkg.name.replace('-', '_').replace('-', '_')}
    ]
}
