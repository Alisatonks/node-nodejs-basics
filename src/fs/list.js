import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const dirPath = path.join(__dirname, 'files');

    try {
        await fs.access(dirPath);
        
        const list = await fs.readdir(dirPath);

        console.log(list);

    } catch(error) {
        console.error;
        throw new Error ('FS operation failed')
    }
};

await list();