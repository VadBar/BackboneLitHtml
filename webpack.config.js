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
                    './src/components/DropDownComponent/style.css',
                    './src/components/ImgUploaderComponent/style.css',
                    './src/components/AdvancedTable/ListBooksComponent/style.css',
                    './src/components/AdvancedTable/FiltrationsComponents/FiltrationByUserValueComponent/style.css',
                    './src/components/AdvancedTable/AdvancedTableComponent/style.css',
                    './src/components/AdvancedTable/PaginationComponent/style.css',
                    './src/components/AdvancedTable/FiltrationsComponents/FiltrationByLotsOfValuesComponent/style.css',
                    './src/components/AdvancedTable/FiltrationsComponents/FiltrationByRulesComponent/style.css'
                ]
            }
        }),
    ]
};
