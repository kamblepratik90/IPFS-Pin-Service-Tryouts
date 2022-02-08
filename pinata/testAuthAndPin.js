const pinataSDK = require('@pinata/sdk');
require('dotenv/config');
const fs = require('fs');



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
    const apiKey = process.env.PINATA_API_KEY;
    const secretKey = process.env.PINATA_API_SECRET;

    if (!apiKey && !secretKey) {
        return console.error('error -> apiKey and secretKey is needed')
    }

    const pinata = pinataSDK(apiKey, secretKey);
    console.log('pinata: ', pinata);
    let result = await pinata.testAuthentication()

    if (!result.authenticated) {
        console.log('err -> return auth failed: ', result);
    }

    const readableStreamForFile = fs.createReadStream('../allFiles/40Kb.jpeg');
    const options = {
        pinataMetadata: {
            name: "MyMetaData"
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    // let pinResult = await pinata.pinFileToIPFS(readableStreamForFile, options)
    // console.log('pinResult -> : ', pinResult);

    let metaData = await pinata.pinJSONToIPFS({
        "name": "2Mb Video",
        "description": "My ExampleNFT is an awesome artwork!",
        "image": "ipfs://bafybeih6vpvnxxpqmzmmfchwjmcvo7ediaqwbdmreaneoue5aixydlagbm/2Mb.mp4"
    },
        // options
    );

    console.log('metaData -> : ', metaData);

    end();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('main error -> ', error);
        process.exit(1);
    });