const fs = require('fs');
const path = require('path');

const serverDir = './src/server';
const destDir = './apps-script';

const serverFiles = fs.readdirSync(path.resolve(__dirname, serverDir));

serverFiles.forEach(file =>
    fs.copyFileSync(
        path.resolve(__dirname, serverDir, file),
        path.resolve(__dirname, destDir, file)
    )
);
