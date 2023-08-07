const path = require('path');
// const CircularDependencyPlugin = require('circular-dependency-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

const projectRoot = 'c:/projects/';

const extensions = [
    '.js', '.mjs', '.cjs', 
    '.jsx', '.cjsx', '.mjsx'
];


module.exports = {
    entry: './src/app.tsx',
    // mode: 'development',
    mode: 'production',
    // devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // see https://github.com/webpack/webpack/issues/11467
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },
    resolve: {
        extensions,
        alias: {
           // 'flo-boolean$':             path.resolve(__dirname, projectRoot, 'boolean/src/index.ts'),
           // 'flo-mat$':                 path.resolve(__dirname, projectRoot, 'mat/src/index.ts'),
           // 'flo-bezier3$':             path.resolve(__dirname, projectRoot, 'bezier/src/index.ts'),
        },
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