
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
            {from: 'client-assets', to: '.'}
        ])
    ]
}