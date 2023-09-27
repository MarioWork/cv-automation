const fs = require('fs');
const path = require('path');

const sourceDir = './src/server';
const destDir = './apps-script';

const copyFiles = ({ sourceDir, destDir }) => {
    const files = fs.readdirSync(sourceDir);

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const destinationPath = path.join(destDir, file);

        fs.lstat(sourcePath, (_, stats) => {
            if (stats.isDirectory()) {
                copyFiles(sourcePath, destDir);
                return;
            }

            fs.copyFileSync(sourcePath, destinationPath);
        });
    });
};

copyFiles({ sourceDir, destDir });
