import * as QlcJS from './src/index.ts';

if (typeof window !== 'undefined' && typeof window.QlcJS === 'undefined') {
    window.QlcJS = QlcJS;
}

module.exports = QlcJS;
