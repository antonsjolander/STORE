require('babel-polyfill');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: true,
    entry: {
        script: ['babel-polyfill', './src/script.js'],
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/assets'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|woff|woff2|eot|ttf|)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            { test: /\.hbs$/, use: 'handlebars-loader' }
        ]
    },

    plugins: [new ExtractTextPlugin('[name].css', { allChunks: true })]
};
