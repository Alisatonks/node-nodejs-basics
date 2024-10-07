import {spawn} from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    
    const filePath = path.join(__dirname, 'files', 'script.js');

    const childProcess = spawn('node', [filePath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess( ['arg1', 'arg2', 'arg3']);
