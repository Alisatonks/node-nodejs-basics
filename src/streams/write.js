import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    const writeStream = createWriteStream(filePath); 

    process.stdin.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Data has been written to fileToWrite.txt');
    });

    writeStream.on('error', (error) => {
        console.error('Error writing to file:', error.message);
    });

    console.log('Please enter the data:');
};

await write();