import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip, gzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {

    const compressPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const archivePath = path.join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(compressPath);
    const writeStream = createWriteStream(archivePath);

    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('file has been compressed')
    });

    writeStream.on('error', (e) => {
        console.error(e.message)
    })
    
};

await compress();