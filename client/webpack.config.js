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
        port: 8000,
        proxy: {
            "/api/*": {
                target: "http://localhost:5000",
                secure: false,
                logLevel: "debug",
                changeOrigin: true
              },
              "/uploads/*": {
                target: "http://localhost:5000",
                secure: false,
                logLevel: "debug",
                changeOrigin: true
              }
        }
      },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "vendor.css": [
                    './src/css/style.css',
                    './src/components/dropDownComponent/style.css',
                    './src/components/imgUploader/style.css',
                    './src/components/listBooksComponent/style.css',
                    './src/components/filterComponent/style.css',
                    './src/components/mainListComponent/style.css',
                    './src/components/paginationComponent/style.css',
                    './src/components/filterByLotsOfValuesComponent/style.css',
                    './src/components/filterByRulesComponent/style.css'
                ]
            }
        }),
    ]
};
