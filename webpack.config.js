// webpack.config.js
const path = require('path');

module.exports = {
    entry: './functions/next-lunar-new-year.js',
    target: 'webworker',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'worker.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify")
        }
    }
};