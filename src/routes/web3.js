// const pinataSDK = import('@pinata/sdk');
import { ethers } from 'ethers';
import { contractABI } from '../lib/abi'
// const pinata = new pinataSDK('yourPinataApiKey', 'yourPinataSecretApiKey');

const contractAddress = '0x1BF5F223DebD02BE6d9F51fB1514c21188aF24d2';


let provider;
let contract;
let signer;
let accounts;

export async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
        console.log("Please install MetaMask!");
    }
}

export async function uploadMetadataToIPFS(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata);
        return response.IpfsHash;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        return null;
    }
}

export async function createListing(price, title, description, image) {
    const metadata = {
        title: title,
        description: description,
        price: price,
        image: image
    };

    const ipfsHash = await uploadMetadataToIPFS(metadata);
    if (ipfsHash) {
        const tx = await contract.createListing(ethers.utils.parseEther(price), ipfsHash);
        await tx.wait();
        console.log(`Listing created with IPFS hash: ${ipfsHash}`);
    }
}