import {createReadStream} from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt')
    
    const hash = createHash('sha256');

    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => {
       hash.update(chunk);
   
    });

    stream.on('end', () => {
        const result = hash.digest('hex');    
        console.log(result);
    });

    stream.on('error', (e) => {
        console.error(e.message);
    })


};

await calculateHash();