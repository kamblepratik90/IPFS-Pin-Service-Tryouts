const fs = require('fs');
const { NFTStorage, File, Blob } = require('nft.storage');
const minimist = require('minimist');
require("dotenv").config();
var mime = require('mime');

const endpoint = 'https://api.nft.storage' // the default

async function main() {
    
    const token = process.env.NFT_STORAGE_API_KEY;
    if (!token) {
        return console.error('A token is needed')
    }
    // const client = new NFTStorage({ token })

  const storage = new NFTStorage({ endpoint, token })
  const cid = await storage.storeDirectory([
    new File([await fs.promises.readFile('pinpie.jpg')], 'pinpie.jpg'),
    new File([await fs.promises.readFile('seamonster.jpg')], 'seamonster.jpg'),
  ])
  console.log({ cid })
  const status = await storage.status(cid)
  console.log('status: ', status)
}
main()