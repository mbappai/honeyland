const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require("web3");
const truffleConfig = require("../eth-contracts/truffle-config.js");

require('dotenv').config();

// // Env files
const MNEMONIC = process.env.MNEMONIC_PHRASE;
const NODE_API_KEY = process.env.INFURA_KEY
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;


// Rinkeby network setup
const CONTRACT = require('../eth-contracts/build/contracts/SolnSquareVerifier.json')
const CONTRACT_ADDRESS = CONTRACT.networks[4].address; // get rinkeby address after deployment


const net_provider = truffleConfig.networks.rinkeby;

const Proof = require('../zokrates/code/square/proof.json');
const proof =  Proof.proof;
const inputs = Proof.inputs;

const MINT_COUNT = 10;

async function app(){

    const provider = new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/" + NODE_API_KEY);

    // set web3 provider --> Infura in our case
    const web3Instance = new Web3(provider);

    // create instance of web3
    const contractInstance = new web3Instance.eth.Contract(CONTRACT.abi,CONTRACT_ADDRESS, { gasLimit: "1000000" })

    
    // loop 10 time
    for(let i = 0; i<=MINT_COUNT; i++){

        try{

            // fetch token supply on each iteration
            const totalSupply = await contractInstance.methods.getTokenSupply().call();
            console.log('total supply: ',totalSupply);
            
            // mint token on each iteration
            await contractInstance.methods.mintNFT(proof,inputs,i,OWNER_ADDRESS).send({from:OWNER_ADDRESS})
            
        }catch(err){
            console.log(err)
            process.exit()
        }

    }
    console.log('Successfully minted 10 tokens!')
}

app();