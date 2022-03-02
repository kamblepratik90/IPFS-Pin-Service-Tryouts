const fs = require ('fs')
const { packToFs } = require ('ipfs-car/pack/fs')
const { CarIndexedReader } = require ('@ipld/car')
const { NFTStorage, File, Blob } = require('nft.storage');
const minimist = require('minimist');
require("dotenv").config();
var mime = require('mime');


async function main() {
    const token = process.env.NFT_STORAGE_API_KEY;
    if (!token) {
        return console.error('A token is needed')
    }
    const storage = new NFTStorage({ token })

    // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
    const { root } = await packToFs({
        input: `${process.cwd()}/pinpie.jpg`,
        output: `${process.cwd()}/output.car`,
    })
    const expectedCid = root.toString()
    console.log({ expectedCid })

    // Create the car reader
    const carReader = await CarIndexedReader.fromFile(
        `${process.cwd()}/output.car`
    )

    console.log('go')

    // send the CAR to nft.storage, the returned CID will match the one we created above.
    const cid = await storage.storeCar(carReader)

    // verify the service stored the CID we expected
    const cidsMatch = expectedCid === cid
    console.log({ cid, expectedCid, cidsMatch })

    // check that the CID is pinned
    const status = await storage.status(cid)
    console.log(status)

    // Delete car file created
    await fs.promises.rm(`${process.cwd()}/output.car`)
}
main()