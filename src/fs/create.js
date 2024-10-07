import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {

    const freshPath = path.join(__dirname, 'filers', 'fresh.txt');

    try {
        await fs.access(freshPath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error; 
        }
        try {
            await fs.writeFile(freshPath, 'I am fresh and young');
            console.log('File created successfully');
        } catch (e) {
            throw new Error(e);
        }
    }
};

await create();