const path = require('path');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        main: './main'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
      }
};
