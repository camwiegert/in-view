module.exports = {
    entry: './docs/lib/js/main.js',
    output: {
        path: __dirname + '/lib/js',
        filename: `bundle.min.js`
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
