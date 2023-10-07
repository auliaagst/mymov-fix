const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }, 
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My Movie App',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Movie Detail',
            template: './src/detail.html',
            filename: 'detail-page.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/detail.html', to: 'detail.html'},
                { from: './src/img', to: 'img'},
            ],
        }),
    ]
};