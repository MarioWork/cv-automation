const fs = require('fs');

const destDir = './src/utils/';
const fileName = 'prompt-creator.js';

const path = './scripts/file-name.json';

const { context, examples } = JSON.parse(fs.readFileSync(path, 'utf8'));

//To remove all white spaces and \n in the string except inside " " aka properties and its values
const transformedExamples = examples.map(ex => ({
    ...ex,
    output: {
        ...ex.output,
        content: ex.output.content.replace(/(".*?"|[^"\s]+)\s*/g, '$1')
    }
}));

//$$$data$$$ so we can replace it with just data without " " and $$$ so it behaves as a variable with a value instead of a string on the written file
const prompt = JSON.stringify({
    context,
    examples: transformedExamples,
    messages: [{ author: 'user', content: '$$$data$$$' }]
}).replace('"$$$data$$$"', 'data');

//Create prompt creation
fs.writeFileSync(destDir + fileName, `module.exports = data => (${prompt})`);

console.log('File created at: ' + destDir + fileName);
