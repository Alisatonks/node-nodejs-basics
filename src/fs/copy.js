import { error } from 'console';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
     const initialDirPath = path.join(__dirname, 'files');
     const copiedDirPath = path.join(__dirname, 'files_copy');

     try {
        await fs.access(initialDirPath);

        try {
            await fs.access(copiedDirPath);
            throw new Error('FS operation failed')
        } catch(e) {
            if(e.code !== 'ENOENT') {
                throw error
            }
        }

        const copyDirectory = async(init, copied) => {
            await fs.mkdir(copied);

            const files = await fs.readdir(init, { withFileTypes: true });

            for(let file of files) {
                const pathCopied = path.join(copied, file.name);
                const pathInit = path.join(init, file.name);

                if(file.isDirectory()) {
                    await copyDirectory(pathInit, pathCopied)
                } else {
                    await fs.copyFile(pathInit, pathCopied)
                }
            }
        }

        await copyDirectory(initialDirPath, copiedDirPath);
        console.log('Folder has been copied')

     } catch(error) {
        console.error(error)
        throw new Error('FS operation failed')
     }
};

await copy();
