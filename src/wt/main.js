import {Worker} from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const CPUs = os.cpus().length;
    const workers = [];
    const promises = [];

    const pathToWorker = path.join(__dirname, 'worker.js');

    for (let i = 0; i< CPUs; i++) {
        const worker = new Worker(pathToWorker);
        const n = 10 + i;

        const promise = new Promise((resolve) => {
            worker.on('message', (result) => {
                resolve(result)
            });
            worker.on('error', () => {
                resolve({status: 'error', data: null})
            });
            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({status: 'error', data: null})
                }
            })
        });

        workers.push(worker);
        promises.push(promise);
        worker.postMessage(n)
    }

    const res = await Promise.all(promises);
    console.log(res);
    workers.forEach(worker => worker.terminate());
};

await performCalculations();