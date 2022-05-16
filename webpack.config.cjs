const path = require('path');
// const CircularDependencyPlugin = require('circular-dependency-plugin');
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

const projectRoot = 'c:/projects/';

const extensions = [
    '.js', '.mjs', '.cjs', 
    '.jsx', '.cjsx', '.mjsx'
];


module.exports = {
    entry: './src/app.tsx',
    // Remove below line in production
    mode: 'development',
    // devtool: false,
    devtool: 'eval-source-map',
    //mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions,
        //alias: {
        //    // TODO - remove for production
        //    'flo-boolean$':             path.resolve(__dirname, projectRoot, 'boolean/src/index.ts'),
        //    'flo-mat$':                 path.resolve(__dirname, projectRoot, 'mat/src/index.ts'),
        //    'flo-bezier3$':             path.resolve(__dirname, projectRoot, 'bezier/src/index.ts'),
        //    'flo-ll-rb-tree$':          path.resolve(__dirname, projectRoot, '../projects-stable', 'll-rb-tree/src/index.ts')
        //},
        plugins: [
            new ResolveTypeScriptPlugin({includeNodeModules: false})
        ]
    },
    output: {
        filename: 'index.js',
        library: {
            type: 'module'
        },
    },
    stats: {
        // Don't display anything, then add back colors, ...
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    },
    optimization: {
        minimize: false
    },
    experiments: {
        outputModule: true
    }
};