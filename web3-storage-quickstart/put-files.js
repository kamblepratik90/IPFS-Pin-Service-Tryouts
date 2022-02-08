import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import 'dotenv/config';

var startTime, endTime;

function start() {
    startTime = new Date();
};

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
}

async function main() {
    start();
    const args = minimist(process.argv.slice(1))
    const token = process.env.WEB3_STORAGE_TOKEN; //args.token
    console.log('token: ', token);

    if (!token) {
        return console.error('A token is needed. You can create one on https://web3.storage')
    }

    if (args._.length < 1) {
        return console.error('Please supply the path to a file or directory')
    }

    const storage = new Web3Storage({ token })
    const files = []

    for (const path of args._) {
        //TODO need to remove if
        if (!path.includes('put-files.js')) {
            const pathFiles = await getFilesFromPath(path)
            files.push(...pathFiles)
            console.log('pathFiles: ', pathFiles);
        }
    }

    if (files.length > 0) {
        console.log(`Uploading ${files.length} files`)
        const cid = await storage.put(files)
        console.log('Content added with CID:', cid)
    } else {
        console.log('No files to push...');
    }
    end();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });