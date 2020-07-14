
const path = require('path');

const projectRoot = '../';

module.exports = {
    entry: './src/app.tsx',
    // Remove below line in production
    //mode: 'development',
    //devtool: 'eval-source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.d.ts' ],
        // The aliases below should not be used in production - rather, the correct node modules should be referenced.
        alias: {
            //'flo-boolean$':             path.resolve(__dirname, projectRoot + 'boolean/src/index.ts'),
            //'flo-mat$':                 path.resolve(__dirname, projectRoot + 'mat/src/index.ts'),
            //'flo-bezier3$':             path.resolve(__dirname, projectRoot + 'bezier/src/index.ts'),
            //'flo-poly$':                path.resolve(__dirname, projectRoot + 'poly/src/index.ts'),
            //'flo-vector2d$':            path.resolve(__dirname, projectRoot + 'vector/src/index.ts'),
            //'double-double$':           path.resolve(__dirname, projectRoot + 'double-double/src/index.ts'),
            //'big-float-ts$':           path.resolve(__dirname, projectRoot + 'big-float/src/index.ts'),

            //'flo-numerical$':           path.resolve(__dirname, projectRoot + 'numerical/src/index.ts'),            
            //'flo-draw$':                path.resolve(__dirname, projectRoot + 'draw/src/index.ts'),
            //'flo-graham-scan$':         path.resolve(__dirname, projectRoot + 'graham-scan/src/index.ts'),
            //'flo-gauss-quadrature$':    path.resolve(__dirname, projectRoot + 'gauss-quadrature/src/index.ts'),
            //'flo-lines-intersections$': path.resolve(__dirname, projectRoot + 'lines-intersections/src/index.ts'),
            //'flo-ll-rb-tree$':          path.resolve(__dirname, projectRoot + 'll-rb-tree/src/index.ts'),
            //'flo-memoize$':             path.resolve(__dirname, projectRoot + 'memoize/src/index.ts'),
        }
    },
    output: {
        filename: 'index.js',
        //path: path.resolve(__dirname, 'dist')
    },
    plugins: [
    ],
    stats: {
        // Don't display anything, then add back colors, ...
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    }
};