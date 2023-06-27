const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function generateText(data) {
    const mm = new MarkovMachine(data);
    return mm.makeText();
}

function readFile(filePath) {
    try {
        const text = fs.readFileSync(filePath, 'utf-8');
        return text;
    } catch (error) {
        console.error(`Error reading file: ${filePath}`);
        process.exit(1);
    }
}

async function readUrl(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error reading URL: ${url}`);
        process.exit(1);
    }
}

async function makeText() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error('Usage: node makeText.js [file|url] [path]');
        process.exit(1);
    }

    const sourceType = args[0];
    const sourcePath = args[1];

    let data;
    if (sourceType === 'file') {
        data = readFile(sourcePath);
    } else if (sourceType === 'url') {
        data = await readUrl(sourcePath);
    } else {
        console.error(`Invalid source type: ${sourceType}`);
        process.exit(1);
    }

    const generatedText = generateText(data);
    console.log(generatedText);
}

makeText();
