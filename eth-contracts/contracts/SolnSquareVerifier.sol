// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";



contract SolnSquareVerifier is ERC721Mintable,Verifier{

    // Solutions struct that can hold an index & an address
    struct Solution{
        address receiverWallet;
        uint index;
    }

    Verifier verifierContract;

    constructor(){
        verifierContract = new Verifier();
    }
    
    // Array of to store unique solutions submitted. 
    Solution[] internal solutions;

    // Mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqSolutions;


    // Emiited after solution has been added to solutions array.
    event SolutionAdded(address receiverWallet, uint index);


    // Modifier to make sure solution has been verified before minting
    modifier solutionDoesNotExist(uint256 index, address receiverWallet) {
        bytes32 key = keccak256(abi.encodePacked(index, receiverWallet));
        require(uniqSolutions[key].receiverWallet == address(0), "SOLUTION NOT UNIQUE: Solution already exists");
        _;
    }




    // Function to add unique solutions into solutions array and emit event afterward.
    // @params to: address of the wallet nft will be sent to after minting
    function addSolutionToArray(address receiverWallet, uint index) public {
        //assign params to solution
        Solution memory solution = Solution(receiverWallet,index);

        // hash index and receiver and set as key to uniqSolutions
        bytes32 key = keccak256(abi.encodePacked(index, receiverWallet));
        uniqSolutions[key] = solution;

        //push solutions to array
        solutions.push(solution);

        //emit event of solution added
        emit SolutionAdded(receiverWallet, index);
    }





    function mintNFT (
        Verifier.Proof memory proof,
        uint256[2] calldata inputs,
        uint index,
        address receiverWallet
        ) public solutionDoesNotExist(index,receiverWallet) {

        require(verifierContract.verifyTx(proof, inputs), "Solution is not verified");

        addSolutionToArray(receiverWallet, index);

        mint(receiverWallet, index);
    }



} // End contract
















  


























