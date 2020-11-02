const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const os = require("os");

let traybinary;
if (os.platform() === "win32") {
    traybinary = "tray_windows_release.exe";
} else if (os.platform() === "darwin") {
    traybinary = "tray_darwin_release";
} else {
    traybinary = "tray_linux_release";
}

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(jpe?g|png|ttf|eot|svg|ico|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            use: 'raw-base64-inline-loader?limit=1000&name=[name].[ext]'
        }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    resolveLoader: {
        alias: {
            'raw-base64-inline-loader': path.join(__dirname, "webpack-loaders", "raw-base64-inline-loader")
        }
    },
    output: {
        filename: 'entry.js',
        path: path.resolve(__dirname, 'dist', 'bin'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'node_modules', 'systray', 'traybin', traybinary),
                to: path.resolve('dist', 'traybin', traybinary)
            }]
        })
    ]
};
