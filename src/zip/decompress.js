import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const archivePath = path.join(__dirname, 'files', 'archive.gz'); 
    const decompressPath = path.join(__dirname, 'files', 'fileToCompress.txt'); 

    const readStream = createReadStream(archivePath);

    const gunzip = createGunzip();

    const writeStream = createWriteStream(decompressPath);

    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File has been decompressed');
    });

    writeStream.on('error', (e) => {
        console.error(e.message);
    });
};

await decompress();