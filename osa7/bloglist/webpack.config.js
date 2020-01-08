const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv ', argv)
    console.log('env ', env)
    const backend_url = 'http://localhost:3001'
    return {
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js',
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                {
                    test: /\.css$/, loaders:
                        ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|gif|ico)$/,
                    use: [
                        'file-loader',
                    ],
                },
            ],
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ],
    }
}

module.exports = config