const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');


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
      },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "vendor.css": [
                    './src/css/style.css',
                    './src/components/dropDownComponent/style.css'
                ]
            }
        }),
    ] 
};
