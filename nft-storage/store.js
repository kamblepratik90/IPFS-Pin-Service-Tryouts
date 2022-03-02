const fs = require('fs');
const { NFTStorage, File, Blob } = require('nft.storage');
const minimist = require('minimist');
require("dotenv").config();
var mime = require('mime');

const endpoint = 'https://api.nft.storage' // the default


async function main() {
    start()
    const token = process.env.NFT_STORAGE_API_KEY;
    if (!token) {
        return console.error('A token is needed')
    }
    const client = new NFTStorage({ token })
    let name = 'pinpie.jpg';
    const metadata = await client.store({
        name: '000000000001.json',
        "description": 'My ExampleNFT is an awesome artwork!',
        image: new File([JSON.stringify({'from': 'incognito'}, null, 2)], '000000000001.json'),
        // image: new File(
        //     [await fs.promises.readFile('pinpie.jpg')], name,
        //        { type: mime.getType('pinpie.jpg') }
        // ),
        // "image": name.replace(/\s/g,'') && new File(
        //     [await fs.promises.readFile('../allFiles/40Kb.jpeg')],
        //     '40Kb.jpeg',
        //        { type: mime.getType('../allFiles/40Kb.jpeg') }
        // ),
        // "attributes": [
        //     {
        //       "trait_type": "Base", 
        //       "value": "Starfish"
        //     }, 
        //     {
        //       "trait_type": "Eyes", 
        //       "value": "Big"
        //     }, 
        //     {
        //       "trait_type": "Mouth", 
        //       "value": "Surprised"
        //     }, 
        //     {
        //       "trait_type": "Level", 
        //       "value": 5
        //     }, 
        //     {
        //       "trait_type": "Stamina", 
        //       "value": 1.4
        //     }, 
        //     {
        //       "trait_type": "Personality", 
        //       "value": "Sad"
        //     }, 
        //     {
        //       "display_type": "boost_number", 
        //       "trait_type": "Aqua Power", 
        //       "value": 40
        //     }, 
        //     {
        //       "display_type": "boost_percentage", 
        //       "trait_type": "Stamina Increase", 
        //       "value": 10
        //     }, 
        //     {
        //       "display_type": "number", 
        //       "trait_type": "Generation", 
        //       "value": 2
        //     }
        //   ],
        // "animation_url": "ipfs://bafybeiffj6r5ewejmusx5p6cwir5wedlqgoqkunmk6zmnde2txkkno6khy/2Mb.mp4",  
        // // properties: {
        // //     custom:
        // //       'Any custom data can appear in properties, files are automatically uploaded.',
        // //     file: new File(
        // //       [await fs.promises.readFile('../allFiles/40Kb.jpeg')],
        // //       '40Kb.jpeg',
        // //       {
        // //         type: mime.getType('../allFiles/40Kb.jpeg'),
        // //       }
        // //     ),
        // //   },
    })
    console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
    console.log('metadata.json contents:\n', metadata.data)
    end()
}


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

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });