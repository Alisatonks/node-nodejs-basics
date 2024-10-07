import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');

    try {
        await fs.access(oldPath);

        try {
            await fs.access(newPath);
            throw new Error ('FS operation failed')
        } catch(error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.rename(oldPath, newPath);
        console.log('file successfully renamed')

    } catch (e) {
        console.log(e);
        throw new Error('FS operation failed');
    }
   
};

await rename();