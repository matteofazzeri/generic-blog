import path from 'path';

module.exports = {
    entry: './src/index.js', // Your entry point
    output: {
        filename: 'index.html', // Output file
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Injects styles into DOM
                    'css-loader',   // Translates CSS into CommonJS
                    'postcss-loader', // Processes CSS with PostCSS (and Tailwind)
                    'sass-loader',   // Compiles SCSS to CSS
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Transpile JavaScript
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
