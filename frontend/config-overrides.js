const webpack = require('webpack');

module.exports = function override(config) {
    // Add fallback for node.js core modules
    config.resolve = {
        ...config.resolve,
        fallback: {
            ...config.resolve.fallback,
            "process": require.resolve("process/browser.js"), // Add .js extension
            "buffer": require.resolve("buffer/").replace('/index.js', ''), // Fix buffer path
            "zlib": require.resolve("browserify-zlib"),
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "util": require.resolve("util/"),
            "url": require.resolve("url/"),
            "assert": require.resolve("assert/"),
            "crypto": require.resolve("crypto-browserify"),
            "path": false,
            "fs": false
        },
        // Add this to enforce file extensions
        fullySpecified: false 
    };

    // Add plugins
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser.js', // Explicit .js extension
            Buffer: ['buffer', 'Buffer']
        }),
        // Only one DefinePlugin for process.env
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ];

    return config;
};