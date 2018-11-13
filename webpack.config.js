const path = require('path');

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
