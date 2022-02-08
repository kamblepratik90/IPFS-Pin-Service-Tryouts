const fs = require('fs');
const { NFTStorage, File, Blob } = require('nft.storage');
require("dotenv").config();

// const endpoint = 'https://api.nft.storage' // the default

async function main() {
    const token = process.env.NFT_STORAGE_API_KEY;
    if (!token) {
        return console.error('A token is needed')
    }
    const storage = new NFTStorage({ token })
      const data = await fs.promises.readFile('pinpie.jpg')
      const cid = await storage.storeBlob(new Blob([data]))
      console.log({ cid })

    // const cid = await storage.storeDirectory([
    //     new File([await fs.promises.readFile('pinpie.jpg')], 'pinpie.jpg'),
    //     new File([await fs.promises.readFile('seamonster.jpg')], 'seamonster.jpg'),
    // ])
    // console.log({ cid })

    const metadata = await storage.store({
        name: 'nft.storage store test',
        description:
          'Using the nft.storage metadata API to create ERC-1155 compatible metadata.',
        // image: "https://ipfs.io/ipfs/" + cid,
        image: await new Blob([data])
      })
      console.log('IPFS URL for the metadata:', metadata.url)
      console.log('metadata.json contents:\n', metadata.data)
}
main()